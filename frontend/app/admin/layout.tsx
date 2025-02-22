import type { Metadata } from "next";
import { verifySession } from "@/src/auth/dal";
import SideBar from "@/components/admin/SideBar";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "DASHBOARD",
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
      <ToastContainer />
    </div>
  );
}
