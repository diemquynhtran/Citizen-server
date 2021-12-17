import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProvinceTitle } from "../dto/province";
import { Province } from "../entities/province";
import { User } from "../entities/user";

export const provinceController = {
  //[GET] province/
  getProvinces: async (req: Request, res: Response) => {
    const body = req.body;
    const provinceRepo = getRepository(Province);
    const provinces = await provinceRepo.find({
      where: {},
      relations: ["admin"],
    });
    console.log(provinces);

    let result = plainToClass(ProvinceTitle, provinces, {
      excludeExtraneousValues: true,
    });
    res.status(200);
    return res.send(result);
  },
  //[POST] /province/create
  // code -> 01 - 63
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      const provinceRepo = getRepository(Province);
      const count = await provinceRepo.count({});
      console.log(count);
      
      // let newDistrict = new District();
      // newDistrict.code = user.province.code + "2 chữ";
      // newDistrict.name = req.body.name;
      // const result = await provinceRepo.save(newDistrict);
      // res.status(200);
      // return res.send(result);
    } catch (e) {
      res.status(400);
      return res.send("Có lỗi xảy ra");
    }
  }
  // update: async (req: Request, res: Response) => {},
  // delete: async (req: Request, res: Response) => {},
  // getById: async (req: Request, res: Response) => {},
};
