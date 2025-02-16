import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateInputClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("apellido_paterno")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("apellido_materno")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await body("email").isEmail().withMessage("El email no es valido").run(req);
  await body("telefono")
    .isMobilePhone("es-MX")
    .withMessage("El telefono no es valido")
    .run(req);
  await body("fecha_nacimiento")
    .isDate()
    .withMessage("Fecha no valida")
    .run(req);
  next();
};
