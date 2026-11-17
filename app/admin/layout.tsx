import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-tight">
      <div className="wrap" style={{ maxWidth: 1000 }}>{children}</div>
    </section>
  );
}
