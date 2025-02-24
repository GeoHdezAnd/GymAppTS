import "server-only";
// DATA ACCESS LAYER
import { redirect } from "next/navigation";
import { cache } from "react"; // Lo guardara en un cache para no hacer la consulta cada que se ingresa al layout si los datos no cambian
import { AdminSchema } from "../schemas/admin";
import getToken from "./token";
import getTokenClient from "./tokenCustomer";
import { CustomerAPIResponseSchema } from "../schemas/customer";

export const verifySession = cache(async () => {
  const token = await getToken();
  if (!token) {
    redirect("/auth/admin/login");
  }

  const url = `${process.env.API_URL}/auth/admin`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });

  const session = await req.json();
  const result = AdminSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/admin/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});

export const verifySessionClient = cache(async () => {
  const token = await getTokenClient();
  if (!token) {
    redirect("/auth/customers/login");
  }

  const url = `${process.env.API_URL}/auth/client`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });

  const session = await req.json();
  const result = CustomerAPIResponseSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/customers/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
