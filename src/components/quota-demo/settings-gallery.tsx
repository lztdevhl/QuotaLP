"use client";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { Dictionary } from "@/locales";

function subscribeOrientation(listener: () => void) {
  const query = window.matchMedia("(min-width: 761px)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const getVertical = () => window.matchMedia("(min-width: 761px)").matches;
const getServerVertical = () => true;

// Website controls frame original screenshots; they are not simulated app UI.
export function SettingsGallery({ t }: { t: Pick<Dictionary, "product"> }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const vertical = useSyncExternalStore(
    subscribeOrientation,
    getVertical,
    getServerVertical,
  );
  const captures = [
    {
      file: "settings-general",
      height: 821,
      alt: t.product.settingsAlt,
      caption: t.product.settingsCaption,
    },
    {
      file: "settings-providers",
      height: 620,
      alt: t.product.providersAlt,
      caption: t.product.providersCaption,
    },
  ];
  return (
    <div className="settings-gallery">
      <div
        className="settings-tabs"
        role="tablist"
        aria-orientation={vertical ? "vertical" : "horizontal"}
        aria-label={t.product.settingsTitle.replaceAll("\n", " ")}
      >
        {captures.map((capture, index) => (
          <button
            key={capture.file}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next: number;
              if (
                ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(
                  event.key,
                )
              )
                next = 1 - index;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = 1;
              else return;
              event.preventDefault();
              setActive(next);
              tabs.current[next]?.focus();
            }}
          >
            {t.product.settingsTabs[index]}
          </button>
        ))}
      </div>
      <div className="settings-stage">
        {captures.map((capture, index) => (
          <div
            key={capture.file}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={active !== index}
            tabIndex={0}
          >
            <figure>
              <div
                className="settings-image-window"
                role="region"
                aria-label={t.product.panHint}
                tabIndex={vertical ? -1 : 0}
              >
                <a
                  href={`/product/${capture.file}.webp`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.product.fullSize}
                >
                  <Image
                    src={`/product/${capture.file}.webp`}
                    width={590}
                    height={capture.height}
                    alt={capture.alt}
                    unoptimized
                  />
                </a>
              </div>
              <p className="capture-pan-hint">{t.product.panHint}</p>
              <figcaption>{capture.caption}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <p className="capture-note">{t.product.settingsNote}</p>
    </div>
  );
}
