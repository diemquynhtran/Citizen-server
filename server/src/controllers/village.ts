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
    const user = res.locals.user;
    const villageRepo = getRepository(Village);
    const villages = await villageRepo.find({
      where: {code: Like(`${user.username}%`)},
      relations: ["admin"],
    });
    let result = plainToClass(VillageTitle, villages, {
      excludeExtraneousValues: true,
    });
    return res.json({
      status: 200,
      messenger: "",
      result: result
    })
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
    return res.json({
      status: 400,
      messenger: "",
      result: result
    })
  },

  //[POST] /village/create
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        return res.json({
          status: 400,
          messenger: "Tên xã không hợp lệ"
        })
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
      newvillage.ward = ward[0];
      const result = await villageRepo.save(newvillage);
      return res.json({
        status: 200,
        messenger: "Thành công",
        result: result
      })
    } catch (e) {
      return res.json({
        status: 400,
        messenger: "Lỗi village"
      })
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        return res.json({
          status: 400,
          messenger: "Tên không hợp lệ"
        })
      }      
      
      const villageRepo = getRepository(Village);
      await villageRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await villageRepo.find({code: req.body.code});      
      return res.json({
        status: 200,
        messenger: "",
        result: result
      })
    }
    catch (e) {
      return res.json({
        status: 400,
        messenger: "lỗi village"
      })
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if(!req.body.code) {
        return res.json({
          status: 400,
          messenger: "Lỗi"
        })
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
        return res.json({
          status: 400,
          messenger: "Thành công"
        })
      }
      return res.json({
        status: 400,
        messenger: "Không xóa được mã này"
      })
    }
    catch (e) {
      return res.json({
        status: 400,
        messenger: "Lỗi village"
      })
    }
  },
  getById: async (req: Request, res: Response) => { },

  getByWard: async (req: Request, res: Response) => {
    const reqbody = req.body;
    if(!reqbody || !reqbody.code) {
      return res.json({
        status: 400,
        messenger: "Error"
      })
    }
    let result = await getRepository(Village).find({
      code: Like(`${reqbody.code}%`)
    })
    return res.json({
      status: 200,
      messenger: "",
      result: result
    })
  },
};
