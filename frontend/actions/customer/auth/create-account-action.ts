"use server";
import { ErrorSchema, SuccessSchema } from "@/src/schemas";
import { RegisterCustomerSchema } from "@/src/schemas/customer";

export async function register(formData: FormData) {
  const registerData = {
    nombre: formData.get("nombre"),
    apellido_paterno: formData.get("apellido_paterno"),
    apellido_materno: formData.get("apellido_materno"),
    fecha_nacimiento: formData.get("fecha_nacimiento"),
    genero: formData.get("genero"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  // Validar
  const register = RegisterCustomerSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return { errors, success: "" };
  }

  // Registrar admin
  const url = `${process.env.API_URL}/auth/client`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: register.data.nombre,
      apellido_paterno: register.data.apellido_paterno,
      apellido_materno: register.data.apellido_materno,
      fecha_nacimiento: register.data.fecha_nacimiento,
      genero: register.data.genero,
      telefono: register.data.telefono,
      email: register.data.email,
      password: register.data.password,
    }),
  });
  const json = await req.json();
  if (req.status === 409 || req.status === 500 ) {
    const error = ErrorSchema.parse(json);
    return {
      errors: [error.error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json); // parse hace que solo devuelva el mensaje que llega del servidor, por ello en el servidor debe ser una respuesta de texto plano con un mensaje, no devuelvas objetos con msg:

  return {
    errors: [],
    success, // interpreta que es un string ya sea vacio o no, no aceptara otros valores
  };
}
