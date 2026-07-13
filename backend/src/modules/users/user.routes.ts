import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";
const router = Router();
const controller = new UserController();
router.get(
  "/me",
  authenticate,
  controller.syncUser.bind(controller)
);

export default router;