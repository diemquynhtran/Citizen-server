import { Request, Response } from "express";
import { Role, User } from "../entities/user";
import { getRepository } from "typeorm";
import { Province } from "../entities/province";
import {Moment} from "moment";
import moment from "moment";

export const userProvinceController = {

    //[GET] /user/province/
    get: async (req: Request, res: Response) => {
        
    },

    //[POST] /user/province/create
    create: async (req: Request, res: Response) => {
        try {
            console.log(req.body);
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
            let province = await getRepository(Province).find(
                { code: code });
            newUser.username = code;
            newUser.password = password;
            newUser.displayName = name;
            newUser.startTime = reqstartTime.toDate();
            newUser.endTime = reqendTime.toDate();
            newUser.role = Role.A2;
            const result = await userRepo.save(newUser);            
            
            province[0].admin = newUser;
            await getRepository(Province).save(province[0]);
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
                messenger: "Lỗi userProvince"
              })
        }

    },


}