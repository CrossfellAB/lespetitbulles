import Image from "next/image";
import InquiryForm from "@/components/InquiryForm";
import { getService, type Service } from "@/content/services";
import { site } from "@/content/site";

const formType: Record<Service["slug"], string> = {
  catering: "Catering",
  "after-work": "After work",
  foretag: "Företagsevent",
  presenter: "Presenter",
};

export default function ServicePage({ slug }: { slug: Service["slug"] }) {
  const s = getService(slug);
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">{s.eyebrow}</p>
        <h1 className="h-xl">{s.title}</h1>
        <p className="lead">{s.lead}</p>
      </section>
      <section className="wrap">
        <Image className="page-photo" src={s.image} alt={s.imageAlt} width={1600} height={900} priority sizes="100vw" />
      </section>
      <section className="section">
        <div className="wrap split" style={{ maxWidth: 1180 }}>
          <div className="prose">
            {s.body.map((p) => (<p key={p.slice(0, 20)}>{p}</p>))}
            <ul className="checklist">{s.points.map((p) => (<li key={p}>{p}</li>))}</ul>
            <p style={{ marginTop: 28 }} className="small">
              Hellre prata direkt? Ring Josefin på <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
            </p>
          </div>
          <div className="panel wide" id="forfragan">
            <h2 className="h-m" style={{ marginBottom: 6 }}>{s.formTitle}</h2>
            <p className="small" style={{ marginTop: 0, marginBottom: 22 }}>{s.formIntro}</p>
            <InquiryForm type={formType[slug]} showDate={s.showDate} showGuests={s.showGuests} email={site.email}
              dateLabel={slug === "presenter" ? "När behöver du presenten?" : "Datum"} />
          </div>
        </div>
      </section>
    </>
  );
}
