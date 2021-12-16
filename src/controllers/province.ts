import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProvinceTitle } from "../dto/province";
import { Province } from "../entities/province";
export const provinceController = {
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
  // code -> 01 - 63
  // create: async (req: Request, res: Response) => {},
  // update: async (req: Request, res: Response) => {},
  // delete: async (req: Request, res: Response) => {},
  // getById: async (req: Request, res: Response) => {},
};
