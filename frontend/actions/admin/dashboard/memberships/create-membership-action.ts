"use server";

import getToken from "@/src/auth/token";
import { ErrorSchema, SuccessSchema } from "@/src/schemas";
import { NewMembership } from "@/src/schemas/membership";

type ActionStateType = {
  errors: string[];
  success: string;
};
export default async function createMembership(
  benefits: string[],
  prevState: ActionStateType,
  formData: FormData
) {
  const newMembershipInput = {
    nombre: formData.get("nombre"),
    beneficios: benefits,
    duracion_dias: Number(formData.get("duracion_dias")),
    precio: Number(formData.get("precio")),
  };
  console.log(newMembershipInput);

  const newMembership = NewMembership.safeParse(newMembershipInput);

  if (!newMembership.success) {
    const errors = newMembership.error.issues.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/membership`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: newMembership.data.nombre,
      beneficios: newMembership.data.beneficios,
      duracion_dias: newMembership.data.duracion_dias,
      precio: newMembership.data.precio,
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

  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
