import type { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import { body } from "express-validator";
import { Cliente } from "../models/Cliente";

declare global {
  namespace Express {
    interface Request {
      client?: Cliente;
    }
  }
}
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
  await body("genero")
    .notEmpty()
    .withMessage("El genero es obligatorio")
    .isLength({ min: 1, max: 1 })
    .withMessage("El genero debe contener 1 letra")
    .isIn(["F", "M"])
    .withMessage("El genero debe ser F o M")
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

export const validateClientID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("clientID")
    .isInt()
    .withMessage("ID no valido")
    .custom((value) => value > 0)
    .withMessage("ID no validó")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateClientExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clientID } = req.params;
    const client = await Cliente.findByPk(clientID, {
      attributes: {
        exclude: [
          "confirmado",
          "eliminado",
          "password",
          "token",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    if (!client) {
      const error = new Error("No existe el cliente");
      res.status(404).json({ error: error.message });
      return;
    }

    req.client = client;
    next();
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Ocurrió un error" });
  }
};
