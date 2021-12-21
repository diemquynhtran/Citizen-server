import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { DistrictTitle } from "../dto/district";
import { District } from "../entities/district";
import { Province } from "../entities/province";
import { User } from "../entities/user";


export const districtController = {
  //[GET] /district
  getAllDistricts: async (req: Request, res: Response) => {
    const body = req.body;
    const districtRepo = getRepository(District);
    const districts = await districtRepo.find({
      where: {},
      relations: ["admin"],
    });
    console.log(districts);

    let result = plainToClass(DistrictTitle, districts, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[GET] /district/getByRole
  getDistrictsByRole: async (req: Request, res: Response) => {
    const user: User = res.locals.user;
    const body = req.body;
    const districtRepo = getRepository(District);
    const districts = await districtRepo.find({
      code: Like(`${user.username}%`)
    });
    let result = plainToClass(DistrictTitle, districts, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },

  //[POST] /district/create
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Tên huyện không hợp lệ");
      }
      const districtRepo = getRepository(District);
      const count = await districtRepo.count({
        code: Like(`${user.username}%`)
      }) + 1;
      let temp;
      if (count < 10) {
        temp = '0' + count;
      } else {
        temp = '' + count;
      }
      let newdistrict = new District();
      const userRepo = getRepository(User);
      newdistrict.code = user.username + temp;
      newdistrict.name = req.body.name;
      const province = await getRepository(Province).find({code: user.username});
      newdistrict.province = province[0];
      const result = await districtRepo.save(newdistrict);
      res.status(200);
      return res.send(result);
    } catch (e) {
      res.status(400);
      return res.send("Huyện này đã tồn tại");
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Têu cầu không hợp lệ");
      }      
      
      const districtRepo = getRepository(District);
      await districtRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await districtRepo.find({code: req.body.code});      
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      res.status(400);
      return res.send("Huyện này đã tồn tại");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if(!req.body.code) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const districtRepo = getRepository(District);
      const count = await districtRepo.count({
        code: Like(`${user.username}%`)
      });
      let temp;
      if (count < 10) {
        temp =user.username + '0' + count;
      } else {
        temp = user.username + count;
      }
      if(req.body.code == temp) {
        await districtRepo.delete({code: req.body.code});
        res.status(200);
        return res.send("Xóa huyện thành công");
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
