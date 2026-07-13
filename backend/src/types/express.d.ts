import "express";
import type { User as AppUser } from "../modules/users/user.types";

declare global {
  namespace Express {
    interface User {
      sub: string;
      username?: string;
      email?: string;
      name?: string;
      client_id?: string;
      scope?: string;
    }

    interface Request {
      user?: User;
      currentUser?: AppUser;
    }
  }
}

export {};