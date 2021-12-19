import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository } from "typeorm";

export const userController = {
  getUser: async (_: Request, res: Response) => {
    return res.send(200);
  },

  create: async (req: Request, res: Response) => {
    try{
      if (!req.body.code || !req.body.name || !req.body.password) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const user: User = res.locals.user;
      console.log(user.role);
      
      const userRepo = getRepository(User);
      const check = await userRepo.find({username: req.body.code}||{displayName: req.body.name})
      if(check == null) {
        res.status(400);
        console.log(check);
        
        return res.send("Tài khoản đã tồn tại");
      }
      
      let newUser = new User();
      if(user.role == Role.A1) {
        newUser.role = Role.A2        
      }
      else if(user.role == Role.A2) {
        newUser.role = Role.A3        
      }
      else if(user.role == Role.A3) {
        newUser.role = Role.B1        
      }
      else if(user.role == Role.B1) {
        newUser.role = Role.B2       
      }
      else {
        return res.send("Yêu cầu không hợp lệ");
      }
      newUser.username = req.body.code;
      newUser.password = req.body.password;
      newUser.displayName = req.body.name;
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
