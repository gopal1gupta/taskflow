import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

const service = new DashboardService();

export class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const user = (req as any).currentUser;

      const dashboard = await service.getDashboard(user.id);

      return res.json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to load dashboard.",
      });
    }
  }
}