// Deterministic crops of reviewed Windows screen captures. No generated UI,
// retouching, recoloring, compositing inside the app, or replacement values.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const raw = path.resolve(".local-reference");
const output = path.resolve("public/product");
await mkdir(output, { recursive: true });
const assets = [
  [
    "final-expanded.png",
    "desktop-expanded",
    { left: 352, top: 36, width: 1568, height: 972 },
  ],
  [
    "final-collapsed.png",
    "desktop-collapsed",
    { left: 352, top: 36, width: 1568, height: 972 },
  ],
  [
    "final-collapsed.png",
    "rail-collapsed",
    { left: 1844, top: 326, width: 76, height: 388 },
  ],
  [
    "final-collapsed.png",
    "demo-collapsed",
    { left: 1500, top: 326, width: 420, height: 388 },
  ],
  ["final-detail.png", "codex-expanded", null],
  ["final-pinned.png", "codex-pinned", null],
  ["settings-general.png", "settings-general", null],
  [
    "settings-providers.png",
    "settings-providers",
    { left: 0, top: 156, width: 590, height: 620 },
  ],
  [
    "settings-codex.png",
    "settings-codex",
    { left: 65, top: 134, width: 460, height: 584 },
  ],
];
for (const [file, name, rect] of assets) {
  const source = sharp(path.join(raw, file));
  const pipeline = rect ? source.extract(rect) : source;
  const result = await pipeline
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(output, `${name}.webp`));
  console.log(
    `${name}: ${result.width}x${result.height}, ${result.size} bytes`,
  );
}
// PNG copy of the original capture for Satori.
await sharp(path.join(raw, "final-detail.png"))
  .png()
  .toFile(path.join(output, "social-codex.png"));

// A 9x5 lossless contact sheet replays the observed timestamps. Incomplete
// compositor frames during native window resize use the already captured
// collapsed state; no ring, surface, text or intermediate pixels are drawn.
for (const direction of ["open", "close"]) {
  const rejected = [];
  const frames = [];
  for (let index = 0; index < 45; index++) {
    let input = path.join(
      raw,
      `${direction}-frames`,
      `frame-${String(index).padStart(3, "0")}.png`,
    );
    const { data, info } = await sharp(input)
      .extract({ left: 350, top: 90, width: 64, height: 72 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    let ringPixels = 0;
    for (let pixel = 0; pixel < data.length; pixel += info.channels) {
      if (data[pixel] > 180 && data[pixel + 1] < 120 && data[pixel + 2] < 90)
        ringPixels++;
    }
    if (ringPixels < 30) {
      rejected.push(index);
      input = path.join(output, "demo-collapsed.webp");
    }
    frames.push({
      input,
      left: (index % 9) * 420,
      top: Math.floor(index / 9) * 388,
    });
  }
  console.log(
    `${direction}: incomplete compositor frames ${JSON.stringify(rejected)}`,
  );
  const result = await sharp({
    create: { width: 3780, height: 1940, channels: 3, background: "#0f1218" },
  })
    .composite(frames)
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(output, `${direction}-frames.webp`));
  console.log(`${direction}-frames: ${result.size} bytes`);
}
