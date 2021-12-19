import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { WardTitle } from "../dto/ward";
import { Ward } from "../entities/ward";
import { Province } from "../entities/province";
import { User } from "../entities/user";
import { District } from "../entities/district";


export const wardController = {
  //[GET] /ward
  getAllwards: async (req: Request, res: Response) => {
    const body = req.body;
    const wardRepo = getRepository(Ward);
    const wards = await wardRepo.find({
      where: {},
      relations: ["admin"],
    });
    console.log(wards);

    let result = plainToClass(WardTitle, wards, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[GET] /ward/getByA3
  getwardsByRole: async (req: Request, res: Response) => {
    const user: User = res.locals.user;
    const body = req.body;
    const wardRepo = getRepository(Ward);
    const wards = await wardRepo.find({
      code: Like(`${user.username}%`)
    });
    let result = plainToClass(WardTitle, wards, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[POST] /ward/create
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Tên xã không hợp lệ");
      }
      const wardRepo = getRepository(Ward);
      const count = await wardRepo.count({
        code: Like(`${user.username}%`)
      }) + 1;
      let temp;
      if (count < 10) {
        temp = '0' + count;
      } else {
        temp = '' + count;
      }
      let newward = new Ward();
      const userRepo = getRepository(User);
      newward.code = user.username + temp;
      newward.name = req.body.name;
      const district = await getRepository(District).find({code: user.username});
      newward.district = district[0];
      const result = await wardRepo.save(newward);
      res.status(200);
      return res.send(result);
    } catch (e) {
      res.status(400);
      return res.send("Xã này đã tồn tại");
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Têu cầu không hợp lệ");
      }      
      
      const wardRepo = getRepository(Ward);
      await wardRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await wardRepo.find({code: req.body.code});      
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      res.status(400);
      return res.send("Xã này đã tồn tại");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if(!req.body.code) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const wardRepo = getRepository(Ward);
      const count = await wardRepo.count({
        code: Like(`${user.username}%`)
      });
      let temp;
      if (count < 10) {
        temp =user.username + '0' + count;
      } else {
        temp = user.username + count;
      }
      if(req.body.code == temp) {
        await wardRepo.delete({code: req.body.code});
        res.status(200);
        return res.send("Xóa xã thành công");
      }
      res.status(400);
      console.log(count);
      
      return res.send("Không xóa được mã này");
    }
    catch (e) {
      console.log(e);
      res.status(400);
      return res.send("Yêu cầu không hợp lệ");
    }
  },
  getById: async (req: Request, res: Response) => { },
};
