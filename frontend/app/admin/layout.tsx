import type { Metadata } from "next";
import { verifySession } from "@/src/auth/dal";
import SideBar from "@/components/admin/SideBar";

export const metadata: Metadata = {
  title: "ADMIN - DASHBOARD",
  description: "Gym App",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <div className="min-h-screen flex flex-col">
      <SideBar content={children} admin={user}  />
    </div>
  );
}
