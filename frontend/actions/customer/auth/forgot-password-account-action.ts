"use server";

import {
  ErrorSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionState = {
  errors: string[];
  success: string;
};

export default async function forgotPassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((error) => error.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/client/forgot-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: forgotPassword.data.email,
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
