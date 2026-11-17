"use client";

import { useRef, useState } from "react";
import type { VideoTip } from "@/content/videos";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function VideoCarousel({ videos }: { videos: VideoTip[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const players = useRef<Record<string, HTMLVideoElement | null>>({});
  const [started, setStarted] = useState<Record<string, boolean>>({});

  const scroll = (dir: number) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>(".video-card");
    row.scrollBy({ left: dir * ((card?.offsetWidth ?? 280) + 20), behavior: "smooth" });
  };

  const play = (slug: string) => {
    setStarted((s) => ({ ...s, [slug]: true }));
    players.current[slug]?.play().catch(() => {});
  };

  // Bara en video spelas åt gången.
  const onPlay = (slug: string) => {
    for (const [key, el] of Object.entries(players.current)) if (key !== slug && el && !el.paused) el.pause();
  };

  return (
    <div className="video-carousel">
      <div className="video-head">
        <div>
          <p className="eyebrow">Från disken</p>
          <h2 className="h-l">Josefin tipsar</h2>
        </div>
        {videos.length > 1 && (
          <div className="video-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label="Föregående video">←</button>
            <button type="button" onClick={() => scroll(1)} aria-label="Nästa video">→</button>
          </div>
        )}
      </div>
      <div className="video-row" ref={rowRef}>
        {videos.map((v) => (
          <figure className="video-card" key={v.slug}>
            <div className="video-frame">
              <video
                ref={(el) => { players.current[v.slug] = el; }}
                src={`/video/${v.slug}.mp4`}
                poster={`/video/${v.slug}.jpg`}
                preload="none"
                playsInline
                controls={!!started[v.slug]}
                onPlay={() => onPlay(v.slug)}
                aria-label={`${v.title}: Josefin berättar`}
              />
              {!started[v.slug] && (
                <button type="button" className="video-play" onClick={() => play(v.slug)} aria-label={`Spela upp ${v.title}`}>
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                  </span>
                  <small>{fmt(v.seconds)}</small>
                </button>
              )}
            </div>
            <figcaption>
              <b>{v.title}</b>
              <span>{v.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
