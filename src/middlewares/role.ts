import { Request, Response, NextFunction } from "express";
import { Role } from "../entities/user";
export const roleRequire = (...roles: Role[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    let user = res.locals.user.role;
    if (user.role && roles.includes(user.role)) {
      next();
    } else {
      res.send({
        code: 0,
        message: "Bạn không có quyền!",
      });
    }
  };
};
