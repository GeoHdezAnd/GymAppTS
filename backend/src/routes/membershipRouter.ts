import { Router } from "express";
import { handleInputErrors } from "../middleware/Validation";
import { MembershipController } from "../controllers/MembershipController";
import {
  validateInputMembership,
  validateMembershipExist,
  validateMembershipId,
} from "../middleware/membership";

const router = Router();

router.param("membershipID", validateMembershipId);
router.param("membershipID", validateMembershipExist);

router.get("/", MembershipController.getAll);
router.post(
  "/",
  validateInputMembership,
  handleInputErrors, // Middleware para manejar errores de validación
  MembershipController.create
);
router.get("/:membershipID", MembershipController.getById);
router.put(
  "/:membershipID",
  // TODO: Es necesario que al conectar al frontend se agregue validacion de los campos de la membresia
  MembershipController.updateById
);
router.delete("/:membershipID", MembershipController.deleteById);

export default router;
