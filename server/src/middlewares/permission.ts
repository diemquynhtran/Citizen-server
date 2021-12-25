import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { Role } from "../entities/user";
import { User } from "../entities/user";

export const permissionUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const user: User = res.locals.user;
  let timeNow = moment();
  let timeStart = moment(user.startTime);
  let timeEnd = moment(user.endTime);
  if (timeStart <= timeNow && timeEnd >timeNow) {
    user.permission = true;
  }
  else user.permission = false;

  if (user.permission) {
    next();
  }
  else {
    return res.send({
      code: 0,
      message: "Tài khoản của bạn đã bị khóa",
    });
  }
}


