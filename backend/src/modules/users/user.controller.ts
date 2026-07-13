import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class UserController {
  async syncUser(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const user = await service.getOrCreateUser(
        req.user.sub,
        req.user.email ?? "",
        req.user.name ?? undefined
      );

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Unable to synchronize user.",
      });
    }
  }
}