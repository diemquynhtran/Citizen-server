import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository, Timestamp } from "typeorm";
import { Ward } from "../entities/ward";
import moment from "moment";

export const userwardController = {

    //[GET] /user/ward/
    get: async (req: Request, res: Response) => {
        
    },

    //[post] /user/ward/create
    create: async (req: Request, res: Response) => {
        try {
            let timeNow = moment();
            let {code, name, password, timeEnd, timeStart} = req.body;
            if (!code || !name || !password) {
                res.status(400);
                return res.send("Yêu cầu không hợp lệ");
            }
            const user: User = res.locals.user;
            const userRepo = getRepository(User);
            const check1 = await userRepo.find({ username: code });
            const check2 = await userRepo.find({ displayName: name});            
            if (check1.length != 0 || check2.length!=0) {
                return res.send({
                    code: 401,
                    messenger: "Tài khoản đã tồn tại"
                });
            }
            let newUser = new User();
            const reqTimeStart = moment(timeStart);            
            const reqTimeEnd = moment(timeEnd);
            if (reqTimeEnd < moment()) {
                return res.send({
                    code: 401,
                    messenger: "Thời gian không hợp lệ"
                });
            }
            if (reqTimeStart <= timeNow) {
                newUser.permission = true;
            }
            else newUser.permission = false;
            let ward = await getRepository(Ward).find(
                { code: code });
            newUser.username = code;
            newUser.password = password;
            newUser.displayName = name;
            newUser.startTime = reqTimeStart.toDate();
            newUser.endTime = reqTimeEnd.toDate();
            newUser.role = Role.B1;
            const result = await userRepo.save(newUser);            
            
            ward[0].admin = newUser;
            await getRepository(Ward).save(ward[0]);
            return res.json({
                status: 200,
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