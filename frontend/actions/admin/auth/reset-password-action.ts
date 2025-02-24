"use server";

import { ErrorSchema, ResetPassword, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};
export default async function resetPassword(
  token: string,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const resetPasswordInput = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const resetPassword = ResetPassword.safeParse(resetPasswordInput); // comprobamos con el schema de zod

  if (!resetPassword.success) {
    const errors = resetPassword.error.issues.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/admin/reset-password/${token}`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
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
