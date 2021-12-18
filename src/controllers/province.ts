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
      if (!req.body.name) {
        res.status(400);
        return res.send("Tên tỉnh không hợp lệ");
      }
      const provinceRepo = getRepository(Province);
      const count = await provinceRepo.count({}) + 1;
      if (count > 63) {
        res.status(400);
        res.send("Đã đủ số lượng tỉnh");
      }
      let temp;
      if (count < 10) {
        temp = '0' + count;
      } else {
        temp = '' + count;
      }
      let newProvince = new Province();
      newProvince.code = temp;
      newProvince.name = req.body.name;
      const result = await provinceRepo.save(newProvince);
      res.status(200);
      return res.send(result);
    } catch (e) {
      res.status(400);
      return res.send("Tỉnh này đã tồn tại");
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        res.status(400);
        return res.send("Tên tỉnh không hợp lệ");
      }      
      const provinceRepo = getRepository(Province);
      await provinceRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await provinceRepo.find({code: req.body.code});      
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      res.status(400);
      return res.send("Tỉnh này đã tồn tại");
    }
  },


  delete: async (req: Request, res: Response) => {
    try {
      if(!req.body.code) {
        res.status(400);
        return res.send("Yêu cầu không hợp lệ");
      }
      const provinceRepo = getRepository(Province);
      const count = await provinceRepo.count({});
      if(req.body.code == count) {
        await provinceRepo.delete({code: req.body.code});
        res.status(200);
        return res.send("Xóa tỉnh thành công");
      }
      res.status(400);
      return res.send("Không xóa được mã này");
    }
    catch (e) {
      console.log(e);
      res.status(400);
      return res.send("Yêu cầu không hợp lệ");
    }
  },
  // getById: async (req: Request, res: Response) => {},
};
