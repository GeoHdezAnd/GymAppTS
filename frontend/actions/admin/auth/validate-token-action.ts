"use server";

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function validateToken(
  token: string
): Promise<ActionStateType> {
  const validateToken = TokenSchema.safeParse(token);
  if (!validateToken.success) {
    const error = validateToken.error.issues.map((error) => error.message);
    return {
      errors: error,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/admin/validate-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: validateToken.data,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const error = ErrorSchema.safeParse(json);
    return {
      errors: error.success
        ? [error.data.error]
        : ["Un error desconocido ha ocurrido"],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success: success,
  };
}
