import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProvinceTitle } from "../dto/province";
import { District } from "../entities/district";
import { Province } from "../entities/province";
import { User } from "../entities/user";
import { Village } from "../entities/village";
import { Ward } from "../entities/ward";

export const provinceController = {
 
  getAll: async (req: Request, res: Response) => {

    let provinceRepo = getRepository(Province);
    let districtRepo = getRepository(District);
    let wardRepo = getRepository(Ward);
    let villageRepo = getRepository(Village);
    let result = [];
    result = await villageRepo.find({
      relations: ["Ward"],
    })  
    // for (const i of result) {
    //   i.district.province = await districtRepo.find(District)({
    //     relations: ["province"],
    //   })
  },
  //[GET] province/
  getProvinces: async (req: Request, res: Response) => {
    const body = req.body;
    const provinceRepo = getRepository(Province);
    const provinces = await provinceRepo.find({
      where: {},
      relations: ["admin"],
    });
    //console.log(provinces);

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
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }
      const provinceRepo = getRepository(Province);
      const count = await provinceRepo.count({}) + 1;
      if (count > 63) {
        return res.json({
          status: 400,
          messenger: "Đủ số lượng tỉnh"
        })
      }
      let temp;
      if (count < 10) {
        temp = '0' + count;
      } else {
        temp = '' + count;
      }
      let newProvince = new Province();
      const userRepo = getRepository(User); 
      const userAdmin = await userRepo.find({username: temp});
      newProvince.code = temp;
      newProvince.name = req.body.name;
      //newProvince.admin = userAdmin[0];
      const result = await provinceRepo.save(newProvince);
      res.status(200);
      return res.send(result);
    } catch (e) {
      console.log(e);
      return res.json({
        status: 400,
        messenger: "Tỉnh đã tồn tại"
      })
    }
  },


  update: async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.user;
      if (!req.body.name) {
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }      
      const provinceRepo = getRepository(Province);
      await provinceRepo.update({code: req.body.code}, {name: req.body.name});
      const result =await provinceRepo.find({code: req.body.code});      
      res.status(200);
      return res.send(result);
    }
    catch (e) {
      return res.json({
        status: 400,
        messenger: "Tỉnh đã tồn tại"
      })
    }
  },


  delete: async (req: Request, res: Response) => {
    try {
      if(!req.body.code) {
        return res.json({
          status: 400,
          messenger: "Yêu cầu không hợp lệ"
        })
      }
      const provinceRepo = getRepository(Province);
      const count = await provinceRepo.count({});
      if(req.body.code == count) {
        await provinceRepo.delete({code: req.body.code});
        return res.json({
          status: 200,
          messenger: "Xóa tỉnh thành công"
        })
      }
      return res.json({
        status: 400,
        messenger: "Không thể xóa"
      })
    }
    catch (e) {
      console.log(e);
      return res.json({
        status: 400,
        messenger: "Yêu cầu không hợp lệ"
      })
    }
  },
  
  getByName: async (req: Request, res: Response) => {
    try {
      const provinceRepo = getRepository(Province);
      const result =await provinceRepo.find({name: req.body.name});      
      return res.json({
        status: 200,
        messenger: "Thành công",
        province: result
      })
      // res.status(200);
      // return res.send(result);
    }
    catch (e) {
      console.log(e);
      return res.json({
        status: 400,
        messenger: "Không tìm thấy tỉnh"
      })
      
    }
  },

  // async getPersonByProvince(req, res) {
  //   const { ids = [] } = req.body;
  //   try {
  //     const provinceNames = [];
  //     var personsResult = [];
  //     for (const id of ids) {
  //       if (await validationProvinceId(id, "getPerson")) {
  //         const province = await Province.findOne({
  //           where: { provinceId: id },
  //         });
  //         provinceNames.push(province.provinceName);
  //       }
  //     }

  //     for (const provinceName of provinceNames) {
  //       const persons = await Person.findAll({
  //         where: {
  //           thuongTru: {
  //             [Op.like]: `%${provinceName}%`,
  //           },
  //         },
  //       });
  //       personsResult = personsResult.concat(persons);
  //     }
  //     return res.json({ status: 1, persons: personsResult });
  //   } catch (e) {
  //     return res.json({ status: 0, error: "GET_PERSON_BY_PROVINCE_ERROR!" });
  //   }
  // }
};
