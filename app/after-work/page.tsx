import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getService } from "@/content/services";

export const metadata: Metadata = { title: "After work", description: getService("after-work").lead };

export default function Page() {
  return <ServicePage slug="after-work" />;
}
