import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const createMatricula = (
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  fecha_nacimiento: string
) => {
  const inicialNombre = nombre.substring(0, 2).toUpperCase();
  const inicialApellidoPaterno = apellido_paterno.charAt(0).toUpperCase();
  const inicialApellidoMaterno = apellido_materno.charAt(0).toUpperCase();

  const fecha = new Date(fecha_nacimiento);
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes (0-11) + 1
  const dia = String(fecha.getDate() + 1).padStart(2, "0");

  return `${inicialNombre}${inicialApellidoPaterno}${inicialApellidoMaterno}-${mes}${dia}`;
};
