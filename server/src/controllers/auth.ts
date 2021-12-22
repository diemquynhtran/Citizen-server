import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { JWTService } from "../helpers/jwt";
import * as bcrypt from "bcrypt";
import { UserTitleDto } from "../dto/user";

export const authController = {

  //[POST] /auth/login
  login: async (req: Request, res: Response) => {
    const reqUser = req.body;
    if(!reqUser.username || !reqUser.password || !reqUser) 
      return res.status(400).send("Không hợp lệ");
    // if (reqUser.username != "admin") {
    //   isValidPassword
    // }
    const user = await getRepository(User).findOne({
      where:{
        username: reqUser.username,
      }
    })
    if (!user)
      return res.status(400).send("Tên tài khoản không đúng");
    else if (user.username=="admin") {
      if(user.password != reqUser.password) {
        return res.status(400).send("Mật khẩu không đúng");
      }
    }
    else {
      const check = await bcrypt.compare(reqUser.password,user.password);
      if(!check) {
        return res.status(400).send("Mật khẩu không đúng");
      }
    }
    const payload = {
      username: user.username,
      role: user.role,
      displayName: user.displayName,
    };
    let info = plainToClass(UserTitleDto, user, {
      excludeExtraneousValues: true,
    });
    return res.json({
      status: 200,
      message: "Xác thực thành công",
      information: info,
      token: JWTService.generate(payload),
    })
    
  },
};
