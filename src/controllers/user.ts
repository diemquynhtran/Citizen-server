import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository } from "typeorm";

export const userController = {
  getUser: async (_: Request, res: Response) => {
    return res.send(200);
  },

  create: async (req: Request, res: Response) => {
    try {
      const userReq = req.body;
      if (!userReq.code || !userReq.name || !userReq.password) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const user: User = res.locals.user;
      const userRepo = getRepository(User);
      const check = await userRepo.find({ username: userReq.code } || { displayName: userReq.name });      
      if (check.length !=0) {
        res.status(400);
        console.log(check);
        
        return res.send("Tài khoản đã tồn tại");
      }
      if (userReq.startTime < Date.now || userReq.endTime < Date.now || userReq.startTime < userReq.endTime) {
        return res.send("Time không hợp lệ");
      }

      let newUser = new User();
      if (user.role == Role.A1) {
        newUser.role = Role.A2
      }
      else if (user.role == Role.A2) {
        newUser.role = Role.A3
      }
      else if (user.role == Role.A3) {
        newUser.role = Role.B1
      }
      else if (user.role == Role.B1) {
        newUser.role = Role.B2
      }
      else {
        return res.send("Yêu cầu không hợp lệ");
      }
      newUser.username = userReq.code;
      newUser.password = userReq.password;
      newUser.displayName = userReq.name;
      newUser.startTime = userReq.startTime;
      newUser.endTime = userReq.endTime;
      const result = await userRepo.save(newUser);
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      console.log(e);
      return res.send("Yêu cầu không hợp lệ");
    }
  },
};
