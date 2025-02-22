import CustomersPrincipal from "@/components/admin/customers/CustomersPrincipal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DASHBOARD - CLIENTES",
  description: "GYM APP - CLIENTES",
};

export default function CustomersPage() {
  return (
    <>
      <h2 className="text-xl font-semibold">
        ¡Bienvenido a la sección de clientes!
      </h2>
      <CustomersPrincipal />
    </>
  );
}
