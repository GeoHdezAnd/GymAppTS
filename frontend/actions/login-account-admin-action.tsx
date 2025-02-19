"use server";
import { LoginSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
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

  return {
    errors: [],
    success: "Correcto ",
  };
}
