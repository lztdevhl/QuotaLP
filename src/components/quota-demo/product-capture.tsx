/* Native screenshots are deliberately served losslessly, without image-service
 * re-encoding. Mobile uses its own reviewed crop, never a tiny desktop screen. */
import Image from "next/image";
import type { Dictionary } from "@/locales";
export function ProductCapture({
  t,
  priority = false,
  collapsed = false,
  edge = false,
}: {
  t: Dictionary;
  priority?: boolean;
  collapsed?: boolean;
  edge?: boolean;
}) {
  const desktop = `/product/desktop-${collapsed ? "collapsed" : "expanded"}.webp`;
  return (
    <figure className={`product-capture ${edge ? "product-edge" : ""}`}>
      <a
        className="capture-desktop"
        href={desktop}
        target="_blank"
        rel="noreferrer"
        aria-label={t.product.fullSize}
      >
        <Image
          src={desktop}
          width={1568}
          height={972}
          alt={collapsed ? t.product.collapsedAlt : t.product.desktopAlt}
          unoptimized
          priority={priority}
        />
      </a>
      <a
        className="capture-mobile"
        href={`/product/${collapsed ? "rail-collapsed" : "codex-expanded"}.webp`}
        target="_blank"
        rel="noreferrer"
        aria-label={t.product.fullSize}
      >
        <Image
          src={`/product/${collapsed ? "demo-collapsed" : "codex-expanded"}.webp`}
          width={420}
          height={388}
          alt={collapsed ? t.product.collapsedAlt : t.product.detailAlt}
          unoptimized
          priority={priority}
        />
      </a>
      <figcaption>
        <span>{t.product.snapshot}</span>
        <span>{t.product.originalLanguage}</span>
      </figcaption>
    </figure>
  );
}
