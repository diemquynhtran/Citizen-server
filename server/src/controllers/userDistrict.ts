import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository, Timestamp } from "typeorm";
import { District } from "../entities/district";
import { isDate } from "util";
import moment from "moment";

export const userDistrictController = {

    //[GET] /user/district/
    get: async (req: Request, res: Response) => {
        
    },

    //[post] /user/district/create
    create: async (req: Request, res: Response) => {
        try {
            let timeNow = moment();
            let {code, name, password, endTime, startTime} = req.body;
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
            const reqstartTime = moment(startTime);            
            const reqendTime = moment(endTime);
            if (reqendTime < moment()) {
                return res.send({
                    code: 401,
                    messenger: "Thời gian không hợp lệ"
                });
            }
            if (reqstartTime <= timeNow) {
                newUser.permission = true;
            }
            else newUser.permission = false;
            let district = await getRepository(District).find(
                { code: code });
            newUser.username = code;
            newUser.password = password;
            newUser.displayName = name;
            newUser.startTime = reqstartTime.toDate();
            newUser.endTime = reqendTime.toDate();
            newUser.role = Role.A3;
            const result = await userRepo.save(newUser);            
            
            district[0].admin = newUser;
            await getRepository(District).save(district[0]);
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
                messenger: "Lỗi userdistrict"
              })
        }

    },


}