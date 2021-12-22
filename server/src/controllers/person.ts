import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Address } from "../entities/address";
import { Person } from "../entities/person";
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
          let addr = await getRepository(Address).save(newDefaultAddress);
          newPerson.defaultAddress = addr;
          let result =await getRepository(Person).save(newPerson);
          console.log(result);
          res.send(result);
          
      }
      catch (e) {
          console.log(e);
          
      }
  },
  
};
