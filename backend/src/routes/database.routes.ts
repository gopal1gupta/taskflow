import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.get("/database", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;