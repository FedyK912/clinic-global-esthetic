import Image from "next/image";

/**
 * Visuel du hero : photographie réelle d'une séance au cabinet,
 * traversée par le balayage laser signature du site (CSS pur).
 */
export default function HeroVisual({
  caption,
  alt,
}: {
  caption: readonly [string, string] | readonly string[];
  alt: string;
}) {
  return (
    <div className="hero-visual">
      <Image
        src="/images/laser-seance-jambes.jpg"
        alt={alt}
        width={1200}
        height={1600}
        priority
        sizes="(max-width: 960px) 100vw, 45vw"
      />
      <div className="scan-line" aria-hidden="true"></div>
      <div className="scan-caption" aria-hidden="true">
        <span>{caption[0]}</span>
        <span>{caption[1]}</span>
      </div>
    </div>
  );
}
