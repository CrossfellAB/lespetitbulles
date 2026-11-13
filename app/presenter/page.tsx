import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/content/services";

export const metadata: Metadata = { title: "Presenter", description: getService("presenter").lead };

export default function Page() {
  return <ServicePage slug="presenter" />;
}
