import { Request, Response, NextFunction } from "express";
import { UserService } from "../modules/users/user.service";

const userService = new UserService();

export async function currentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await userService.getUserByCognitoSub(
      req.user.sub
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Application user not found",
      });
    }

    (req as any).currentUser = user;

    next();
  } catch (error) {
    next(error);
  }
}