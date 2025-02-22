import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/Validation";
import { AuthAdminController } from "../controllers/AuthAdminController";
import { authenticate, validateInputAdminAuth } from "../middleware/authAdmin";
import { limiter } from "../config/limiter";

const router = Router();

router.post(
  "/",
  limiter,
  validateInputAdminAuth,
  handleInputErrors,
  AuthAdminController.create
);

router.post(
  "/confirm-account",
  limiter,
  body("token")
    .notEmpty()
    .withMessage("Token no valido")
    .isLength({ min: 6, max: 6 })
    .withMessage("Maximo debe tener 6 caracteres"),
  handleInputErrors,
  AuthAdminController.confirmAccount
);
router.post(
  "/login",
  limiter,
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("Contraseña no valida"),
  handleInputErrors,
  AuthAdminController.login
);
router.post(
  "/forgot-password",
  limiter,
  body("email").isEmail().withMessage("El email no es valido"),
  handleInputErrors,
  AuthAdminController.forgotPassword
);

router.post(
  "/validate-token",
  limiter,
  body("token")
    .notEmpty()
    .withMessage("Token no valido")
    .isLength({ min: 6, max: 6 })
    .withMessage("Maximo debe tener 6 caracteres"),
  handleInputErrors,
  AuthAdminController.validateToken
);

router.post(
  "/reset-password/:token",
  limiter,
  param("token")
    .notEmpty()
    .withMessage("Token no valido")
    .isLength({ min: 6, max: 6 })
    .withMessage("Maximo debe tener 6 caracteres"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe ser mayor a 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una letra minuscula")
    .matches(/\d/)
    .withMessage("Debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un caracter especial"),
  handleInputErrors,
  AuthAdminController.resetPasswordWithToken
);

router.get("/", authenticate, AuthAdminController.admin);

router.post(
  "/update-password",
  limiter,
  body("current_password")
    .notEmpty()
    .withMessage("La contraseña actual no puede ser vacia"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe ser mayor a 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una letra minuscula")
    .matches(/\d/)
    .withMessage("Debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un caracter especial"),
  handleInputErrors,
  authenticate,
  AuthAdminController.updateCurrentUserPassword
);

router.post(
  "/check-password",
  limiter,
  authenticate,
  body("password").notEmpty().withMessage("La contraseña no puede estar vacia"),
  handleInputErrors,
  AuthAdminController.checkPassword
);
export default router;
