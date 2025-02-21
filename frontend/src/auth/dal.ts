import "server-only";
// DATA ACCESS LAYER
import { redirect } from "next/navigation";
import { cache } from "react"; // Lo guardara en un cache para no hacer la consulta cada que se ingresa al layout si los datos no cambian
import { cookies } from "next/headers";
import { AdminSchema } from "../schemas/admin";

export const verifySession = cache(async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("GYMAPP_TOKEN")?.value;
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
