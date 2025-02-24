"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.set({
    name: "GYMAPP_TOKEN",
    value: "",
    httpOnly: true, // Si es TRUE solo el servidor puede acceder al cookie, en false puede acceder el cliente, el TRUE nos da seguridad
    path: "/admin",
  });
  redirect("/auth/admin/login");
}
