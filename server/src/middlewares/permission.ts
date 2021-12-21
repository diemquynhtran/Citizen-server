import { Request, Response, NextFunction } from "express";
import { Role } from "../entities/user";
import { User } from "../entities/user";

export const permissionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const user: User = res.locals.user;
    if(user.permission) {      
        next();
    }
    else {
        return res.send({
            code: 0,
            message: "Tài khoản của bạn đã bị khóa",
          });
    }
}


