import { Router } from "express";
import multer from "multer";

import { authenticate } from "../../middleware/auth.middleware";
import { currentUser } from "../../middleware/current-user.middleware";

import { UploadController } from "./upload.controller";

const router = Router();

const controller = new UploadController();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authenticate,
  currentUser,
  upload.single("file"),
  controller.upload.bind(controller)
);

router.get(
  "/",
  authenticate,
  currentUser,
  controller.list.bind(controller)
);

router.delete(
  "/:id",
  authenticate,
  currentUser,
  controller.delete.bind(controller)
);

export default router;