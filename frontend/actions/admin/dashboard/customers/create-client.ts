"use server";
import getToken from "@/src/auth/token";
import { ErrorSchema, SuccessSchema } from "@/src/schemas";
import { NewClientSchema } from "@/src/schemas/admin/dashboard";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function createNewClient(
  prevState: ActionStateType,
  formData: FormData
) {
  const newClientInput = {
    nombre: formData.get("nombre"),
    apellido_paterno: formData.get("apellido_paterno"),
    apellido_materno: formData.get("apellido_paterno"),
    fecha_nacimiento: formData.get("fecha_nacimiento"),
    genero: formData.get("genero"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
  };

  const newClient = NewClientSchema.safeParse(newClientInput);
  if (!newClient.success) {
    const errors = newClient.error.issues.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }
  const token = await getToken();
  const url = `${process.env.API_URL}/client`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: newClient.data.nombre,
      apellido_paterno: newClient.data.apellido_paterno,
      apellido_materno: newClient.data.apellido_materno,
      fecha_nacimiento: newClient.data.fecha_nacimiento,
      genero: newClient.data.genero,
      telefono: newClient.data.telefono,
      email: newClient.data.email,
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
