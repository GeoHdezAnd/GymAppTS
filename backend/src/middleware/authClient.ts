import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Cliente } from "../models/Cliente";
import { body } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      client?: Cliente;
    }
  }
}

export const validateInputClientAuth = async (
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
  await body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe ser mayor a 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una letra minuscula")
    .matches(/\d/)
    .withMessage("Debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un caratcer especial")
    .run(req);
  next();
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    res.status(401).json({ msg: error.message });
    return;
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    const error = new Error("No autorizado");
    res.status(401).json({ msg: error.message });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      req.client = await Cliente.findByPk(decoded.id, {
        attributes: [
          "id",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "email",
        ],
      });
      next();
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Token no valido" });
  }
};
