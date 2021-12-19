import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { VillageTitle } from "../dto/village";
import { Village } from "../entities/village";
import { User } from "../entities/user";
import { Ward} from "../entities/ward";


export const villageController = {
  //[GET] /village
  getAllvillages: async (req: Request, res: Response) => {
    const body = req.body;
    const villageRepo = getRepository(Village);
    const villages = await villageRepo.find({
      where: {},
      relations: ["admin"],
    });
    console.log(villages);

    let result = plainToClass(VillageTitle, villages, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[GET] /village/getByA3
  getvillagesByRole: async (req: Request, res: Response) => {
    const user: User = res.locals.user;
    const body = req.body;
    const villageRepo = getRepository(Village);
    const villages = await villageRepo.find({
      code: Like(`${user.username}%`)
    });
    let result = plainToClass(VillageTitle, villages, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[POST] /village/create
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Tên xã không hợp lệ");
      }
      const villageRepo = getRepository(Village);
      const count = await villageRepo.count({
        code: Like(`${user.username}%`)
      }) + 1;
      let temp;
      if (count < 10) {
        temp = '0' + count;
      } else {
        temp = '' + count;
      }
      let newvillage = new Village();
      newvillage.code = user.username + temp;
      newvillage.name = req.body.name;
      const ward = await getRepository(Ward).find({code: user.username});
      newvillage.ward = ward;
      const result = await villageRepo.save(newvillage);
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
        return res.send("Yêu cầu không hợp lệ");
      }      
      
      const villageRepo = getRepository(Village);
      await villageRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await villageRepo.find({code: req.body.code});      
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      res.status(400);
      return res.send("Thôn này đã tồn tại");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if(!req.body.code) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const villageRepo = getRepository(Village);
      const count = await villageRepo.count({
        code: Like(`${user.username}%`)
      });
      let temp;
      if (count < 10) {
        temp =user.username + '0' + count;
      } else {
        temp = user.username + count;
      }
      if(req.body.code == temp) {
        await villageRepo.delete({code: req.body.code});
        res.status(200);
        return res.send("Xóa thôn thành công");
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
