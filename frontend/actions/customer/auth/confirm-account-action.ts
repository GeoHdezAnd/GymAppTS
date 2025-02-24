"use server";

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

// type ActionStateType = {
//   errors: string[];
//   success: string;
// };
export async function confirmAccount(token: string) {
  const confirmToken = TokenSchema.safeParse(token);
  if (!confirmToken.success) {
    const errors = confirmToken.error.issues.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }
  // Registrar admin
  const url = `${process.env.API_URL}/auth/client/confirm-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
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

  const success = SuccessSchema.parse(json); // parse hace que solo devuelva el mensaje que llega del servidor, por ello en el servidor debe ser una respuesta de texto plano con un mensaje, no devuelvas objetos con msg:

  return {
    errors: [],
    success, // interpreta que es un string ya sea vacio o no, no aceptara otros valores
  };
}
