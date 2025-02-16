import type { Request, Response, NextFunction } from "express";
import { param, body, validationResult } from "express-validator";
import { Membresia } from "../models/Membresia";

declare global {
  namespace Express {
    interface Request {
      membership?: Membresia;
    }
  }
}

export const validateMembershipId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("membershipID")
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

export const validateMembershipExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { membershipID } = req.params;
    const membership = await Membresia.findByPk(membershipID);
    if (!membership) {
      const error = new Error("No existe la membresia");
      res.status(404).json({ error: error.message });
      return;
    }
    req.membership = membership;
    next();
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Ocurrió un error" });
  }
};

export const validateInputMembership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío")
    .run(req);
  await body("beneficios")
    .isArray({ min: 1, max: 5 })
    .withMessage("Debes ingresar más de un beneficio al arreglo y maximo 5")
    .run(req);
  await body("beneficios.*")
    .optional()
    .isString()
    .withMessage("Cada beneficio debe ser una cadena de texto")
    .run(req);
  await body("duracion_dias")
    .isNumeric()
    .withMessage("Duración no valida")
    .custom((value) => value >= 0)
    .withMessage("El valor de duración debe ser mayor a 0")
    .run(req);
  await body("precio")
    .isNumeric()
    .withMessage("Cantidad no valida")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0")
    .run(req);

  next();
};
