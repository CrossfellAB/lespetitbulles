import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";
import { todayKey } from "@/components/EventList";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";
import { getEvents, getMenu, getProducts, PRODUCT_SLOTS, useBlob } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Middleware släpper bara igenom inloggade, men vi kontrollerar en gång till här.
  if (!(await verifySession((await cookies()).get(SESSION_COOKIE)?.value))) redirect("/admin/login");
  const [events, products, menu] = await Promise.all([getEvents(), getProducts(), getMenu()]);
  return (
    <AdminApp events={events} products={products} menu={menu} slots={PRODUCT_SLOTS} mode={useBlob() ? "blob" : "local"} today={todayKey()} />
  );
}
