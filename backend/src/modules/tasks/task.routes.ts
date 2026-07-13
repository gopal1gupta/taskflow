import { Router } from "express";
import { TaskController } from "./task.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { currentUser } from "../../middleware/current-user.middleware";

const router = Router();
const controller = new TaskController();

// Get all tasks
router.get(
  "/",
  authenticate,
  currentUser,
  controller.getAll.bind(controller)
);

// Create task
router.post(
  "/",
  authenticate,
  currentUser,
  controller.create.bind(controller)
);

// Update task
router.put(
  "/:id",
  authenticate,
  currentUser,
  controller.update.bind(controller)
);

// Delete task
router.delete(
  "/:id",
  authenticate,
  currentUser,
  controller.delete.bind(controller)
);

export default router;