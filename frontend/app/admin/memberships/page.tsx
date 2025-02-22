import MembershipsPrincipal from "@/components/admin/memberships/MembershipsPrincipal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DASHBOARD - MEMBERSHIPS",
  description: "Gym App",
};
export default function MembershiPage() {
  return (
    <>
      <h2 className="font-bold text-xl">
        ¡Bienvenido a la sección de membresias
      </h2>

      <MembershipsPrincipal />
    </>
  );
}
