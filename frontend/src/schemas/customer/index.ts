import { z } from "zod";

export const RegisterCustomerSchema = z
  .object({
    nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
    apellido_paterno: z
      .string()
      .min(1, { message: "El apellido paterno es obligatorio" }),
    apellido_materno: z
      .string()
      .min(1, { message: "El apellido materno es obligatorio" }),
    fecha_nacimiento: z.string().min(1, { message: "La fecha no es valida" }),
    genero: z
      .string({ message: "Genero no es valido" })
      .min(1, { message: "Genero no es valido" })
      .max(1, { message: "Genero no es valido" }),
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

export const CustomerAPIResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellido_paterno: z.string(),
  apellido_materno: z.string(),
  genero: z.string(),
  email: z.string(),
  telefono: z.string(),
  fecha_nacimiento: z.string(),
  matricula: z.string(),
});

export const CustomersAPIResponseSchema = z.array(CustomerAPIResponseSchema);

export type Customer = z.infer<typeof CustomerAPIResponseSchema>