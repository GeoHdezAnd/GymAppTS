import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/Validation";
import { limiter } from "../config/limiter";
import { ClientController } from "../controllers/ClientController";
import { authenticate } from "../middleware/authAdmin";
import { validateInputClient } from "../middleware/client";

const router = Router();
router.use(limiter);

router.post(
  "/",
  authenticate,
  validateInputClient,
  handleInputErrors,
  ClientController.create
);

export default router;
