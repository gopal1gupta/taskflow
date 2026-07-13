import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { env } from "../config/env";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json(
    new ApiResponse(
      true,
      {
        service: "TaskFlow Backend",
        environment: env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      "Backend is healthy"
    )
  );
});

export default router;