import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { currentUser } from "../../middleware/current-user.middleware";

const router = Router();
const controller = new DashboardController();

router.get(
  "/",
  authenticate,
  currentUser,
  controller.getDashboard.bind(controller)
);

export default router;