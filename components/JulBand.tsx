import VideoPlayer from "@/components/VideoPlayer";
import type { Service } from "@/content/services";

// Julfältet: mörk vinröd stjärnhimmel med rubrik, knapp och video. Visas överst på Presenter
// och på startsidan så länge tjänsten har theme: "jul".
export default function JulBand({ s, asPageTitle, ctaHref }: { s: Service; asPageTitle?: boolean; ctaHref: string }) {
  const Heading = asPageTitle ? "h1" : "h2";
  return (
    <section className="jul-band">
      <div className="wrap jul-grid">
        <div className="jul-text">
          <p className="eyebrow"><span aria-hidden="true">✦ </span>{s.eyebrow}</p>
          <Heading className="h-xl">{s.title}</Heading>
          <p className="lead">{s.lead}</p>
          <div className="jul-actions">
            <a href={ctaHref} className="btn btn-clay">{s.formTitle}</a>
            {s.notice && <span className="jul-notice">{s.notice}</span>}
          </div>
        </div>
        {s.video && (
          <figure className="jul-video">
            <VideoPlayer slug={s.video.slug} title={s.video.caption ?? s.title} seconds={s.video.seconds} />
            {s.video.caption && <figcaption>{s.video.caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
