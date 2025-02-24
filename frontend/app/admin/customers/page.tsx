import CustomersPrincipal from "@/components/admin/customers/CustomersPrincipal";
import getToken from "@/src/auth/token";
import { CustomersAPIResponseSchema } from "@/src/schemas/customer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DASHBOARD - CLIENTES",
  description: "GYM APP - CLIENTES",
};

async function getCustomers() {
  const token = await getToken();
  const url = `${process.env.API_URL}/client/`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  const customers = CustomersAPIResponseSchema.parse(json);
  return customers;
}

export default async function CustomersPage() {
  const customers = await getCustomers();
  return (
    <>
      <h2 className="text-xl font-semibold">
        ¡Bienvenido a la sección de clientes!
      </h2>
      <CustomersPrincipal customers={customers} />
    </>
  );
}
