"use server";

import { RegisterAdminSchema } from "@/src/schemas";

export async function register(formData: FormData) {
  const registerData = {
    nombre: formData.get("nombre"),
    apellido_paterno: formData.get("apellido_paterno"),
    apellido_materno: formData.get("apellido_materno"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  // Validar
  const register = RegisterAdminSchema.safeParse(registerData);
  const errors = register.error?.errors.map((error) => error.message);
  console.log(errors);
  // Registrar admin
  console.log(registerData);
}
