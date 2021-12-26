import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { getRepository, Like } from "typeorm";
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
  else {
    user.permission = false;
    let userCancel = await getRepository(User).find({
      where: {username: Like(`${user.username}%`)}
    })
    let i;
    for (i=0 ; i< userCancel.length;i++) {
      userCancel[i].permission = false;
      }
    }
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


