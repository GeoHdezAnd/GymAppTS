import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/Validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/authAdmin";
import { ShopMembershipController } from "../controllers/ShopMembershipController";

const router = Router();
router.use(limiter);

router.post(
  "/",
  body("cliente_id").isInt().withMessage("El ID del cliente no es valido"),
  body("membresia_id").isInt().withMessage("El ID del cliente no es valido"),
  handleInputErrors,
  authenticate,
  ShopMembershipController.createSale
);

router.get("/", ShopMembershipController.getAll)

export default router;
