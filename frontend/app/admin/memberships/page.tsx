import MembershipsPrincipal from "@/components/admin/memberships/MembershipsPrincipal";
import getToken from "@/src/auth/token";
import { MembershipsAPIResponseSchema } from "@/src/schemas/membership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DASHBOARD - MEMBERSHIPS",
  description: "Gym App",
};

async function getMemberships() {
  const token = await getToken();
  const url = `${process.env.API_URL}/membership/`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  const memberships = MembershipsAPIResponseSchema.parse(json);
  return memberships;
}
export default async function MembershiPage() {
  const memberships = await getMemberships();

  return (
    <>
      <h2 className="font-bold text-xl">
        ¡Bienvenido a la sección de membresias
      </h2>

      <MembershipsPrincipal memberships={memberships} />
    </>
  );
}
