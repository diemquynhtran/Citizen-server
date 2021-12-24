import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository, Timestamp } from "typeorm";
import { Ward } from "../entities/ward";

export const userwardController = {

    //[GET] /user/ward/
    get: async (req: Request, res: Response) => {
        
    },

    //[post] /user/ward/create
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
            let ward = await getRepository(Ward).find({ code: userReq.code });
            let newUser = new User();
            newUser.username = userReq.code;
            newUser.password = userReq.password;
            newUser.displayName = userReq.name;
            newUser.startTime = userReq.startTime;
            newUser.endTime = userReq.endTime;
            //newUser.ward = ward[0];
            newUser.role = Role.A3;
            const result = await userRepo.save(newUser);
            
            ward[0].admin = newUser;
            await getRepository(Ward).save(ward[0]);
            return res.json({
                status: 400,
                messenger: "",
                result: result
              })
        }
        catch (e) {
            console.log(e);
            
            return res.json({
                status: 400,
                messenger: "Lỗi userward"
              })
        }

    },


}