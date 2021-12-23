import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Address } from "../entities/address";
import { District } from "../entities/district";
import { Person } from "../entities/person";
import { Village } from "../entities/village";
import { Ward } from "../entities/ward";
export const personController = {
  create: async (req: Request, res: Response) => {
      try {
          const {name, birthDay, gender, religion, level, job, defaultAddress, otherAddress} = req.body;
          let newPerson = new Person();
          newPerson.name = name;
          newPerson.birthDay = birthDay;
          newPerson.gender = gender;
          newPerson.religion = religion;
          newPerson.level = level;
          newPerson.job = job;
          let newDefaultAddress = new Address();
          newDefaultAddress.detail = defaultAddress.detail;
          let villageReponsitory = getRepository(Village);
          // let village = (await villageReponsitory.find({name: defaultAddress.village}))[0];
          // newDefaultAddress.village = village;
          // let info = {
          //   province: province || Not(isNull(province)),
          //   district: district || Not(isNull(district)),
          //   ward: ward || Not(isNull(ward)),
          // };
          // villageReponsitory.find({
          //   relations: []
          // })
         
          
          
          
          // let addr = await getRepository(Address).save(newDefaultAddress);
          // newPerson.defaultAddress = addr;
          // let result =await getRepository(Person).save(newPerson);
          // return res.json({
          //   status: 200,
          //   messenger: "Thành công",
          //   result: result
          // }) 
      }
      catch (e) {
          console.log(e);
          // return res.json({
          //   status: 400,
          //   messenger: "Có lỗi add person"
          // })
          
      }
  },
  
};
