import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository } from "typeorm";
import { Province } from "../entities/province";

export const userProvinceController = {

    //[GET] /user/
    getUser: async (req: Request, res: Response) => {
        return res.send(200);
    },

    createUserProvince: async (req: Request, res: Response) => {
        try {
            const userReq = req.body;
            if (!userReq.code || !userReq.name || !userReq.password) {
                res.status(400);
                return res.send("Yêu cầu không hợp lệ");
            }
            const user: User = res.locals.user;
            const userRepo = getRepository(User);
            const check = await userRepo.find({ username: userReq.code } || { displayName: userReq.name });
            if (check.length != 0) {
                return res.send({
                    code: 401,
                    messenger: "Tài khoản đã tồn tại"
                });
            }
            if (userReq.startTime < Date.now || userReq.endTime < Date.now || userReq.startTime < userReq.endTime) {
                return res.send({
                    code: 401,
                    messenger: "Thời gian không hợp lệ"
                });
            }
            let province = await getRepository(Province).find({ code: userReq.code });
            let newUser = new User();
            newUser.username = userReq.code;
            newUser.password = userReq.password;
            newUser.displayName = userReq.name;
            newUser.startTime = userReq.startTime;
            newUser.endTime = userReq.endTime;
            newUser.province = province[0];
            newUser.role = Role.A2;
            const result = await userRepo.save(newUser);
            
            // province[0].admin = newUser;
            // await getRepository(Province).save(province[0]);
            res.status(200);
            return res.send(result);
        }
        catch (e) {
            console.log(e);
            return res.send("Yêu cầu không hợp lệ");
        }

    },


}