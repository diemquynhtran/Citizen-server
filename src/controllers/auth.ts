import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { JWTService } from "../helpers/jwt";
export const authController = {

  //[POST] /auth/login
  login: async (req: Request, res: Response) => {
    const reqUser = req.body;
    if(!reqUser.username || !reqUser.password || !reqUser) 
      return res.status(400).send("Không hợp lệ");
    const user = await getRepository(User).findOne({
      where:{
        username: reqUser.username,
        password: reqUser.password
      }
    })
    if (!user)
      return res.status(400).send("Tên tài khoản hoặc mật khẩu không đúng");
    const payload = {
      username: user.username,
      role: user.role,
      displayName: user.displayName,
    };
    return res.json({
      status: 200,
      message: "Xác thực thành công token nè",
      token: JWTService.generate(payload),
    })
    
  },
};
