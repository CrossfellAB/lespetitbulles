import type { Metadata } from "next";
import EventList from "@/components/EventList";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Event & provningar",
  description: "Champagne- och ostprovningar, after work och andra kvällar hos Les Petit Bulles i Lindens Galleria, Norrköping.",
};
export const revalidate = 3600;

export default async function EventPage({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
  const { event } = await searchParams;
  return (
    <>
      <section className="wrap page-hero center">
        <p className="eyebrow">Kalendern</p>
        <h1 className="h-xl">Event &amp; provningar</h1>
        <p className="lead">
          Provningar där Josefin parar champagne med ost, after work i baren och säsongens kvällar. Anmäl intresse så hör vi av oss
          med plats och pris.
        </p>
      </section>
      <section className="section-tight">
        <div className="wrap" style={{ maxWidth: 1180 }}>
          <EventList />
        </div>
      </section>
      <section className="section">
        <div className="wrap split" style={{ maxWidth: 1180 }}>
          <div className="prose">
            <h2 className="h-l" style={{ marginBottom: 18 }}>Egen provning för ert sällskap?</h2>
            <p>Vi ordnar gärna en provning bara för er: födelsedagen, möhippan, bokklubben eller jobbet. Hos oss i baren eller hemma hos er.</p>
            <p>Skriv vad ni tänkt er så föreslår vi champagner, ostar och pris.</p>
          </div>
          <div className="panel wide" id="anmalan">
            <h2 className="h-m" style={{ marginBottom: 6 }}>Anmäl intresse</h2>
            <p className="small" style={{ marginTop: 0, marginBottom: 22 }}>Vi bekräftar plats och pris via mejl.</p>
            <InquiryForm
              key={event ?? "none"}
              type="Event & provningar"
              showGuests
              email={site.email}
              messageLabel="Vilket event, eller vad vill ni göra?"
              defaultMessage={event ? `Jag vill anmäla intresse till: ${event}` : ""}
            />
          </div>
        </div>
      </section>
    </>
  );
}
