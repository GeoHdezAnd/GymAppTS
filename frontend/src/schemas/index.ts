import { z } from "zod";

export const RegisterAdminSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "El nombre es obligatorio" })
      .email({ message: "Email no valido" }),
    apellido_paterno: z
      .string()
      .min(1, { message: "El apellido paterno es obligatorio" }),
    apellido_materno: z
      .string()
      .min(1, { message: "El apellido materno es obligatorio" }),
    telefono: z
      .string()
      .min(1, { message: "El telefono es obligatorio" })
      .max(10, { message: "El telefono debe ser menor a 10 digitos" }),
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "No es valido el email" }),
    password: z.string().min(1, { message: "El password es necesario" }),
    password_confirm: z
      .string()
      .min(1, { message: "Debes confirmar tu password" }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Los passwords no coinciden",
    path: ["password_confirm"],
  });
