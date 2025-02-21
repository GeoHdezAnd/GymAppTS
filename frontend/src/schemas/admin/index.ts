import { z } from "zod";

export const RegisterAdminSchema = z
  .object({
    nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
    apellido_paterno: z
      .string()
      .min(1, { message: "El apellido paterno es obligatorio" }),
    apellido_materno: z
      .string()
      .min(1, { message: "El apellido materno es obligatorio" }),
    telefono: z
      .string()
      .min(1, { message: "El telefono es obligatorio" })
      .max(10, { message: "El telefono debe ser menor a 10 digitos" })
      .regex(/^\d+$/, { message: "El teléfono solo debe contener números" }),
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

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "No es valido el email" })
    .email({ message: "No es valido el formato" }),
  password: z.string().min(1, { message: "La contraseña no es valida" }),
});

export const AdminSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido_paterno: z.string(),
  apellido_materno: z.string(),
  email: z.string().email(),
});

export type Admin = z.infer<typeof AdminSchema>;


