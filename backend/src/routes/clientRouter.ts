import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/Validation";
import { limiter } from "../config/limiter";
import { ClientController } from "../controllers/ClientController";
import { authenticate } from "../middleware/authAdmin";
import {
  validateClientExist,
  validateClientID,
  validateInputClient,
} from "../middleware/client";

const router = Router();
router.use(limiter);

router.param("clientID", validateClientID);
router.param("clientID", validateClientExist);

router.get("/", authenticate, ClientController.getAll);
router.get("/:clientID", authenticate, ClientController.getByID);
router.get("/:clientID/attendances", ClientController.getAttendances);
router.post(
  "/",
  authenticate,
  validateInputClient,
  handleInputErrors,
  ClientController.create
);

router.put("/:clientID", authenticate, ClientController.updateByID);
router.delete("/:clientID", authenticate, ClientController.deleteByID);

export default router;
