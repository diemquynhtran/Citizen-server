import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository } from "typeorm";

export const userController = {

  //[GET] /user/
  getUser: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //[POST] user/create  : Mặc định khi cấp timeEnd, timeStart hợp lệ thì permission = true;
  create: async (req: Request, res: Response) => {
    try {
      const userReq = req.body;
      if (!userReq.code || !userReq.name || !userReq.password) {
        return res.json({
          status: 400,
          messenger: "Lỗi yêu cầu"
        })
      }
      const user: User = res.locals.user;
      const userRepo = getRepository(User);
      const check = await userRepo.find({ username: userReq.code } || { displayName: userReq.name });      
      if (check.length !=0) {
        return res.json({
          status: 400,
          messenger: "Tài khoản đã tồn tại"
        })
      }
      if (userReq.startTime < Date.now || userReq.endTime < Date.now || userReq.startTime < userReq.endTime) {
        return res.json({
          status: 400,
          messenger: "Time không hợp lệ"
        })      }

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
        return res.json({
          status: 400,
          messenger: "Lỗi yêu cầu"
        })      }
      newUser.username = userReq.code;
      newUser.password = userReq.password;
      newUser.displayName = userReq.name;
      newUser.startTime = userReq.startTime;
      newUser.endTime = userReq.endTime;
      const result = await userRepo.save(newUser);
      return res.json({
        status: 200,
        messenger: "Thành công",
        result: result
      })
    }
    catch (e) {
      return res.json({
        status: 400,
        messenger: "Yêu cầu không hợp lệ user"
      })
    }
  },

  //[PUT] /user/update
  update: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //[DELETE] /user/delete
  deltete: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //Khóa quyền khai báo
  //[GET] /
  cancelDeclare: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //Cấp lại quyền khai báo 
  //[GET] /
  grantDeclare: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //Xác nhận hoàn thành điều tra: Chỉ cấp thôn do B1 quản lí của xã xác nhận cho các thôn, các cấp trên thì nếu all cấp dưới hoàn thành thì là cấp trên hoàn thành
  //[GET] /
  comfirmComplete: async (_: Request, res: Response) => {
    return res.send(200);
  },

  //Hủy xác nhận hoàn thành điều tra:
  //[GET] /
  cancelConfirmComplete: async (_: Request, res: Response) => {
    return res.send(200);
  },

};
