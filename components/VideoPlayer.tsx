"use client";

import { useRef, useState } from "react";

// En enskild video med affischbild och uppspelningsknapp, samma utseende som i karusellen på Butiken.
export default function VideoPlayer({ slug, title, seconds }: { slug: string; title: string; seconds: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const fmt = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="video-frame">
      <video ref={ref} src={`/video/${slug}.mp4`} poster={`/video/${slug}.jpg`} preload="none" playsInline controls={started} aria-label={title} />
      {!started && (
        <button
          type="button"
          className="video-play"
          onClick={() => {
            setStarted(true);
            ref.current?.play().catch(() => {});
          }}
          aria-label={`Spela upp: ${title}`}
        >
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <small>{fmt}</small>
        </button>
      )}
    </div>
  );
}
