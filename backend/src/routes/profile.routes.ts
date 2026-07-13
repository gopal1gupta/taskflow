import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.json({
    success: true,
    message: "Authenticated user",
    user: req.user,
  });
});

export default router;