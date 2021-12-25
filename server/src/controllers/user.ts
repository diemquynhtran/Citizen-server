import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository, Like } from "typeorm";
import { Province } from "../entities/province";
import { Ward } from "../entities/ward";
import { District } from "../entities/district";

export const userController = {

  //[GET] /user/
  getUser: async (req: Request, res: Response) => {
    return res.send(200);
  },

  //[POST] user/create/A2  
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
      if (check.length != 0) {
        return res.json({
          status: 400,
          messenger: "Tài khoản đã tồn tại"
        })
      }
      if (userReq.startTime < Date.now || userReq.endTime < Date.now || userReq.startTime < userReq.endTime) {
        return res.json({
          status: 400,
          messenger: "Time không hợp lệ"
        })
      }

      let newUser = new User();
      newUser.role = Role.A2;
      newUser.username = userReq.code;
      newUser.password = userReq.password;
      newUser.displayName = userReq.name;
      newUser.startTime = userReq.startTime;
      newUser.endTime = userReq.endTime;
      const result = await userRepo.save(newUser);
      const province = await getRepository(Province).find({ code: userReq.code });
      province[0].admin = result;
      await getRepository(Province).save(province);
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
  update: async (req: Request, res: Response) => {
    
  },

  //[DELETE] /user/delete
  deltete: async (req: Request, res: Response) => {
    return res.send(200);
  },

  //Khóa quyền khai báo
  //[PUT] /user/cancelDeclare
  cancelDeclare: async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      if (!req.body || !code) {
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }
      let user = await getRepository(User).find({ username: code });
      let result = await getRepository(User).update({ id: user[0].id }, { permission: false });
      return res.json({
        status: 200,
        messenger: "Thanh cong",
        result: result
      })
    }
    catch (e) {
        return res.json({
          status: 400,
          messenger: "Có lỗi chỗ khóa quyền user"
        })
    }
  },

  //Cấp lại quyền khai báo 
  //[PUT] /user/grantDeclare
  grantDeclare: async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      if (!req.body || !code) {
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }
      let user = await getRepository(User).find({ username: code });
      let result = await getRepository(User).update({ id: user[0].id }, { permission: true });
      return res.json({
        status: 200,
        messenger: "Thanh cong",
        result: result
      })
    }
    catch (e) {
        return res.json({
          status: 400,
          messenger: "Có lỗi chỗ cấp lại quyền"
        })
      }
  },

  //Xác nhận hoàn thành điều tra: Chỉ cấp xã có tài khoản B1 quản lí của xã xác nhận cho xã đó, các cấp trên thì nếu all cấp dưới hoàn thành thì là cấp trên hoàn thành
  //[POST] /
  comfirmComplete: async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      if (!req.body || !code) {
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }
      let ward = await getRepository(Ward).find({ code: code });
      let result = await getRepository(Ward).update({ code: ward[0].code }, { state: true });
      let district = code.slice(0, 4);
      let checkWard = await getRepository(Ward).find({
        where:[
          {code: Like(`${district}%`),
          state: false}
        ]
      })
      if(checkWard.length == 0) {
        await getRepository(District).update({ code: district }, { state: true });
      }

      let province = code.slice(0, 2);
      let checkProvince = await getRepository(District).find({
        where:[
          {code: Like(`${province}%`),
          state: false}
        ]
      })
      if(checkProvince.length == 0) {
        await getRepository(Province).update({ code: province }, { state: true });
      }
      
      if (result == null) {
        return res.json({
          status: 400,
          messenger: "Có lỗi chỗ xác nhận hoàn thành maybe khoong tim thay"
        })
      }
      return res.json({
        status: 200,
        messenger: "Thanh cong",
      })
    }
    catch (e) {
        return res.json({
          status: 400,
          messenger: "Có lỗi chỗ xác nhận hoàn thành"
        })
    }
  },

  //Hủy xác nhận hoàn thành điều tra: Chắc không cần đâu :))
  //[GET] /
  cancelConfirmComplete: async (req: Request, res: Response) => {
    return res.send(200);
  },

};
