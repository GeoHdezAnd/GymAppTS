import { z } from "zod";

export const NewMembership = z.object({
  nombre: z
    .string({ message: "El formato del nombre no es valido" })
    .min(1, { message: "El nombre es obligatorio" }),
  beneficios: z
    .string()
    .array()
    .nonempty({ message: "El array no debe ir vacio" }),
  duracion_dias: z
    .number()
    .int({ message: "No es un valor valido la duración" })
    .positive({ message: "No puede tener valor negativo la duración" }),
  precio: z
    .number({ message: "No es un valor valido el precio" })
    .positive({ message: "No puede tener valor negativo el precio" }),
});
