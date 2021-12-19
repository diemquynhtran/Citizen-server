import { Request, Response, NextFunction } from "express";
import { Role } from "../entities/user";
export const roleRequire = (...roles: Role[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    let user = res.locals.user;
    let check = false;
    let i;
    for (i=0 ; i< roles.length;i++) {
      if (user.role == roles[i]) {
        check = true;
        break;
      }
    }
    if (check) {
      next();
    } else {
      res.send({
        code: 0,
        message: "Bạn không có quyền!",
      });
    }
    // if ( roles.includes(user.role)) {
    //   next();
    // } else {
    //   res.send({
    //     code: 0,
    //     message: "Bạn không có quyền!",
    //   });
    // }
  };
};