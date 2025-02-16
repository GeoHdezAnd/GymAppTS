import { Router } from "express";
import { handleInputErrors } from "../middleware/Validation";
import { AuthClientController } from "../controllers/AuthClientController";
import {
  authenticate,
  validateInputClientAuth,
} from "../middleware/authClient";
import { body, param } from "express-validator";
import { limiter } from "../config/limiter";

const router = Router();
router.use(limiter);
router.post(
  "/",
  validateInputClientAuth,
  handleInputErrors,
  AuthClientController.create
);
router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("Token no valido")
    .isLength({ min: 6, max: 6 })
    .withMessage("Maximo debe tener 6 caracteres"),
  handleInputErrors,
  AuthClientController.confirmAccountClient
);
router.post(
  "/login",
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("Contraseña no valida"),
  handleInputErrors,
  AuthClientController.login
);
router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("El email no es valido"),
  handleInputErrors,
  AuthClientController.forgotPassword
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .withMessage("Token no valido")
    .isLength({ min: 6, max: 6 })
    .withMessage("Maximo debe tener 6 caracteres"),
  handleInputErrors,
  AuthClientController.validateToken
);

router.post(
  "/reset-password/:token",
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
  AuthClientController.resetPasswordWithToken
);

router.get("/", authenticate, AuthClientController.client);

router.post(
  "/update-password",
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
  AuthClientController.updateCurrentUserPassword
);
router.post(
  "/check-password",
  authenticate,
  body("password").notEmpty().withMessage("La contraseña no puede estar vacia"),
  handleInputErrors,
  AuthClientController.checkPassword
);
export default router;
