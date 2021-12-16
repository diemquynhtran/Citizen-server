import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { District } from "../entities/district";
import { User } from "../entities/user";
export const districtController = {
  getDistrict: async (req: Request, res: Response) => {},
  create: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      const districtRepo = getRepository(District);
      const count = await districtRepo.count({
        where: {
          province: user.province,
        },
      });
      let newDistrict = new District();
      newDistrict.code = user.province.code + "2 chữ";
      newDistrict.name = req.body.name;
      const result = await districtRepo.save(newDistrict);
      res.status(200);
      return res.send(result);
    } catch (e) {
      res.status(400);
      return res.send("Có lỗi xảy ra");
    }
  },
  update: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
  getById: async (req: Request, res: Response) => {},
};
