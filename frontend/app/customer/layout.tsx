import type { Metadata } from "next";
import { UserProvider } from "@/src/context/ClientContext";
import { verifySessionClient } from "@/src/auth/dal";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "USER - PROFILE",
  description: "GymAPP",
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await verifySessionClient();

  return (
    <UserProvider user={user}>
      <div className="min-h-screen flex flex-col">
        {children}
        <ToastContainer />
      </div>
    </UserProvider>
  );
}
