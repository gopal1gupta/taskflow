import { Request, Response, NextFunction } from "express";
import {
  accessTokenVerifier,
  idTokenVerifier,
} from "../config/cognito";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Access Token
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    const accessToken = authHeader.substring(7);

    // ID Token
    const idToken = req.headers["x-id-token"] as string;

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: "ID Token missing",
      });
    }

    // Verify both tokens
    const accessPayload =
      await accessTokenVerifier.verify(accessToken);

    const idPayload =
      await idTokenVerifier.verify(idToken);

    req.user = {
      sub:
        typeof accessPayload.sub === "string"
          ? accessPayload.sub
          : String(accessPayload.sub ?? ""),
      username:
        typeof accessPayload.username === "string"
          ? accessPayload.username
          : undefined,
      client_id:
        typeof accessPayload.client_id === "string"
          ? accessPayload.client_id
          : undefined,
      scope:
        typeof accessPayload.scope === "string"
          ? accessPayload.scope
          : undefined,

      // These come from the ID token
      email:
        typeof idPayload.email === "string"
          ? idPayload.email
          : undefined,
      name:
        typeof idPayload.name === "string"
          ? idPayload.name
          : undefined,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}