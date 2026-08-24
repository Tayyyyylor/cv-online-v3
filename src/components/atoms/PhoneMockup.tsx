"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* Sous 640px les groupes n'affichent qu'un seul mockup (cf. Profile / Stats /
   Share) : on peut donc lui donner toute la largeur utile, plafonnée en vw pour
   les très petits écrans. Au-delà, les tailles servent aux groupes de 2-3. */
const SIZES = {
  md: "w-[min(280px,74vw)] sm:w-[290px]",
  sm: "w-[min(280px,74vw)] sm:w-[230px]",
} as const;

const IMAGE_SIZES = "(max-width: 640px) 74vw, 290px";

type Props = {
  /**
   * Chemin de la vidéo de démo (ex: "/videos/app-demo.mp4"), à déposer dans
   * `public/videos/` après passage par `scripts/optimize-video.sh`.
   * Durée conseillée : 10 à 20 s, format vertical 9:19.5.
   */
  videoSrc?: string;
  /** Image d'aperçu (ex: capture d'écran) à déposer dans `public/images/`. */
  imageSrc?: string;
  /**
   * Poster affiché avant le chargement de la vidéo (généré par
   * `scripts/optimize-video.sh` : `<nom>-poster.jpg`).
   */
  poster?: string;
  /** Texte alternatif de l'image / de la vidéo. */
  alt?: string;
  /** Libellé affiché dans le placeholder tant qu'il n'y a ni image ni vidéo. */
  placeholderLabel?: string;
  /** À passer sur les mockups au-dessus de la ligne de flottaison (hero). */
  priority?: boolean;
  size?: keyof typeof SIZES;
  className?: string;
};

export default function PhoneMockup({
  videoSrc,
  imageSrc,
  poster,
  alt = "",
  placeholderLabel,
  priority = false,
  size = "md",
  className = "",
}: Props) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19.5] ${SIZES[size]} rounded-[2.75rem] border border-border bg-card p-2.5 shadow-2xl ${className}`}
    >
      {/* Boutons physiques */}
      <div className="absolute -left-[3px] top-[104px] h-8 w-[3px] rounded-l-full bg-border" />
      <div className="absolute -left-[3px] top-[150px] h-14 w-[3px] rounded-l-full bg-border" />
      <div className="absolute -right-[3px] top-[130px] h-20 w-[3px] rounded-r-full bg-border" />

      {/* Écran */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-background">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />

        {videoSrc ? (
          <LazyVideo
            src={videoSrc}
            poster={poster}
            alt={alt}
            priority={priority}
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes={IMAGE_SIZES}
          />
        ) : (
          <PlaceholderScreen label={placeholderLabel} />
        )}
      </div>
    </div>
  );
}

/**
 * Vidéo différée : le poster s'affiche immédiatement, la vidéo n'est montée
 * (donc téléchargée) qu'à l'approche du viewport, puis apparaît en fondu dès
 * que la lecture démarre. Si l'autoplay est bloqué (mode économie d'énergie),
 * le poster reste affiché.
 */
function LazyVideo({
  src,
  poster,
  alt,
  priority,
}: {
  src: string;
  poster?: string;
  alt: string;
  priority: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {poster && (
        <Image
          src={poster}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={IMAGE_SIZES}
        />
      )}
      {inView && (
        <video
          className={`relative h-full w-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}

function PlaceholderScreen({ label }: { label?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-accent via-card to-important/30 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background/70 shadow-sm ring-1 ring-border backdrop-blur">
        <Play className="h-6 w-6 translate-x-[2px] fill-important text-important" />
      </span>
      <p className="px-6 text-sm text-muted-foreground">
        {label ?? "Aperçu de l'app"}
        <br />
        <span className="text-xs">bientôt disponible</span>
      </p>
    </div>
  );
}
