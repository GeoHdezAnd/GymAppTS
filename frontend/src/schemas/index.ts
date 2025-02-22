import { z } from "zod";

export const SuccessSchema = z.string().min(1, { message: "Valor no válido" });

export const ErrorSchema = z.object({
  error: z.string(),
});

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .regex(/^\d+$/, { message: "El Token solo debe contener números" })
  .min(6, { message: "Token no valido" })
  .max(6, { message: "Token no valido" });

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email no valido" })
    .email({ message: "Email no valido" }),
});

export const ResetPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });
