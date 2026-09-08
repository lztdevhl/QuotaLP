"use client";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/locales";

// These are timestamps from actual desktop capture, not estimated easing curves.
const timing = {
  open: [
    15, 71, 84, 97, 109, 122, 136, 149, 163, 177, 189, 202, 215, 227, 240, 255,
    267, 296, 307, 321, 335, 359, 375, 388, 401, 421, 440, 454, 467, 493, 508,
    521, 534, 563, 574, 589, 603, 627, 641, 654, 668, 691, 707, 721, 734,
  ],
  close: [
    15, 55, 76, 89, 102, 115, 128, 142, 156, 168, 182, 195, 209, 225, 237, 251,
    277, 290, 305, 323, 344, 356, 369, 383, 402, 422, 436, 451, 480, 488, 502,
    526, 541, 554, 568, 590, 609, 622, 635, 654, 670, 688, 701, 718, 734,
  ],
};
type Mode = "collapsed" | "hovered" | "pinned";
export function RailDemo({ t }: { t: Pick<Dictionary, "product"> }) {
  const [mode, setMode] = useState<Mode>("collapsed");
  const [frame, setFrame] = useState<{
    direction: "open" | "close";
    index: number;
  } | null>(null);
  const modeRef = useRef<Mode>("collapsed");
  const animation = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const loaded = useRef<Partial<Record<string, Promise<void>>>>({});
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        for (const direction of ["open", "close"]) {
          if (loaded.current[direction]) continue;
          const asset = new window.Image();
          asset.src = `/product/${direction}-frames.webp`;
          loaded.current[direction] = asset.decode();
          void loaded.current[direction].catch(() => {});
        }
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      generation.current++;
      cancelAnimationFrame(animation.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }
  function play(direction: "open" | "close", next: Mode) {
    cancelClose();
    const previous = modeRef.current;
    modeRef.current = next;
    setMode(next);
    if ((previous !== "collapsed") === (next !== "collapsed")) return;
    const request = ++generation.current;
    cancelAnimationFrame(animation.current);
    setFrame(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!loaded.current[direction]) {
      const asset = new window.Image();
      asset.src = `/product/${direction}-frames.webp`;
      loaded.current[direction] = asset.decode();
    }
    // On the first interaction the real still remains visible while frames load.
    void loaded.current[direction]
      .then(() => {
        if (generation.current !== request) return;
        const start = performance.now();
        const tick = (now: number) => {
          if (generation.current !== request) return;
          const elapsed = now - start;
          if (elapsed >= 750) {
            setFrame(null);
            return;
          }
          const times = timing[direction];
          let index = 0;
          while (index < times.length - 1 && times[index + 1] <= elapsed)
            index++;
          setFrame({ direction, index });
          animation.current = requestAnimationFrame(tick);
        };
        animation.current = requestAnimationFrame(tick);
      })
      .catch(() => {
        /* The real screenshot is the fallback, never a generated UI. */
      });
  }
  function reveal() {
    cancelClose();
    if (modeRef.current === "collapsed") play("open", "hovered");
  }
  function scheduleClose() {
    if (modeRef.current === "pinned") return;
    cancelClose();
    // The recording already includes the native 180 ms hover grace.
    play("close", "collapsed");
  }
  function close() {
    play("close", "collapsed");
  }
  const src =
    mode === "collapsed"
      ? "demo-collapsed"
      : mode === "pinned"
        ? "codex-pinned"
        : "codex-expanded";
  return (
    <div
      ref={root}
      className="recorded-demo"
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <div className="recorded-frame" data-mode={mode}>
        <Image
          className="recorded-still"
          src={`/product/${src}.webp`}
          width={420}
          height={388}
          alt={t.product.detailAlt}
          unoptimized
        />
        {frame && (
          <div
            className="recorded-animation"
            aria-hidden="true"
            style={{
              backgroundImage: `url(/product/${frame.direction}-frames.webp)`,
              backgroundPosition: `${(frame.index % 9) * 12.5}% ${Math.floor(frame.index / 9) * 25}%`,
            }}
          />
        )}
        <button
          className="recorded-trigger"
          aria-label={t.product.toggle}
          aria-expanded={mode !== "collapsed"}
          aria-controls={id}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") reveal();
          }}
          onFocus={reveal}
          onClick={() =>
            modeRef.current === "pinned" ? close() : play("open", "pinned")
          }
        />
      </div>
      <div className="recorded-controls">
        <button
          onClick={() =>
            modeRef.current === "collapsed" ? play("open", "pinned") : close()
          }
        >
          {mode === "collapsed" ? t.product.open : t.product.close}
        </button>
        <span aria-live="polite">
          {mode === "pinned" ? t.product.pinned : t.product.hint}
        </span>
      </div>
      <p className="capture-note" id={id}>
        {t.product.replayNote}
      </p>
    </div>
  );
}
