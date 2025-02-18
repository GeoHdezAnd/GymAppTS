import { Router } from "express";
import { handleInputErrors } from "../middleware/Validation";
import { AttendanceController } from "../controllers/AttendanceController";
import { limiter } from "../config/limiter";
import { body } from "express-validator";
import { authenticate } from "../middleware/authAdmin";

const router = Router();

router.use(limiter);

router.get("/", AttendanceController.getAll);
router.post(
  "/",
  body("matricula").notEmpty().withMessage("No es valida la matricula"),
  handleInputErrors,
  authenticate,
  AttendanceController.create
);

export default router;
