"use server";
import { ErrorSchema } from "@/src/schemas";
import { LoginSchema } from "@/src/schemas/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type ActionStateType = {
  errors: string[];
};

export async function loginAdmin(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginCredentials);
  if (!auth.success) {
    const errors = auth.error.issues.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/admin/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });

  const json = await req.json();
  if (!req.ok) {
    const error = ErrorSchema.parse(json);
    return {
      errors: [error.error],
      success: "",
    };
  }

  const cookieStore = await cookies();
  //Setear la cookie
  cookieStore.set({
    name: "GYMAPP_TOKEN",
    value: json,
    httpOnly: true, // Si es TRUE solo el servidor puede acceder al cookie, en false puede acceder el cliente, el TRUE nos da seguridad
    path: "/admin",
  });

  redirect("/admin")

  return {
    errors: [],
  };
}
