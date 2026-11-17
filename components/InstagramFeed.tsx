import { site } from "@/content/site";

// Senaste inläggen från Instagram via Behold (behold.so). Flödet hämtas på servern en gång i timmen,
// så besökarna laddar inga skript eller cookies från Instagram. Saknas flödet visas inget alls.

type BeholdSize = { mediaUrl?: string; width?: number; height?: number };
type BeholdPost = {
  id: string;
  permalink: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel?: boolean;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: { small?: BeholdSize; medium?: BeholdSize; large?: BeholdSize };
  caption?: string;
  prunedCaption?: string;
  timestamp?: string;
};

const COUNT = 6;

async function getPosts(): Promise<BeholdPost[]> {
  const url = process.env.INSTAGRAM_FEED_URL || site.instagram.feedUrl;
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    // Behold skickar antingen en lista med inlägg eller ett objekt med fältet posts.
    const posts: BeholdPost[] = Array.isArray(data) ? data : data?.posts ?? [];
    return posts.filter((p) => p?.permalink && image(p)).slice(0, COUNT);
  } catch {
    return [];
  }
}

function image(p: BeholdPost) {
  return p.sizes?.medium?.mediaUrl ?? p.sizes?.small?.mediaUrl ?? p.thumbnailUrl ?? (p.mediaType === "VIDEO" ? undefined : p.mediaUrl);
}

function alt(p: BeholdPost) {
  const text = (p.prunedCaption ?? p.caption ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "Inlägg på Instagram";
  return text.length > 120 ? `${text.slice(0, 117)}…` : text;
}

const dateFmt = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short", timeZone: "Europe/Stockholm" });

export default async function InstagramFeed() {
  const posts = await getPosts();
  if (!posts.length) return null;
  return (
    <section className="section ig-section">
      <div className="wrap" style={{ maxWidth: 1180 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ig-handle">{site.instagram.handle}</a>
            </p>
            <h2 className="h-l">Senaste nytt</h2>
          </div>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="note">Följ oss på Instagram →</a>
        </div>
        <ul className="ig-grid">
          {posts.map((p) => {
            const isVideo = p.mediaType === "VIDEO" || p.isReel;
            return (
              <li key={p.id}>
                <a href={p.permalink} target="_blank" rel="noopener noreferrer" className="ig-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image(p)} alt={alt(p)} loading="lazy" decoding="async" />
                  {isVideo && (
                    <span className="ig-icon" aria-label="Video">
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                    </span>
                  )}
                  {!isVideo && p.mediaType === "CAROUSEL_ALBUM" && (
                    <span className="ig-icon" aria-label="Flera bilder">
                      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8zM3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" /></svg>
                    </span>
                  )}
                  {p.timestamp && <span className="ig-date">{dateFmt.format(new Date(p.timestamp))}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
