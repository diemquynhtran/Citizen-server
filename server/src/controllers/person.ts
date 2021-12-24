import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { PersonTitleDto } from "../dto/person";
import { UserTitleDto } from "../dto/user";
import { Address } from "../entities/address";
import { District } from "../entities/district";
import { Person } from "../entities/person";
import { Province } from "../entities/province";
import { User } from "../entities/user";
import { Village } from "../entities/village";
import { Ward } from "../entities/ward";
export const personController = {

    //[POST] /person/create
    delete: async (req: Request, res: Response) => {
        try {
            let check = await getRepository(Person).findOne(req.body.id);
            if (check) {
                await getRepository(Person).delete({ id: req.body.id });
                return res.json({
                    status: 200,
                    messenger: "Xoa person",
                })
            }
            else {
                return res.json({
                    status: 400,
                    messenger: "Khong tim thay person"
                })
            }
        }
        catch (e) {
            console.log(e);
            return res.json({
                status: 400,
                messenger: "Có lỗi delete person"
            })
        }
    },
    
    //[GET] /person/getByRole
    getByRole: async (req: Request, res: Response) => {
        try {
            let user = res.locals.user;
            const result = await getRepository(Person).find({
                relations:["defaultAddress", "otherAddress", "hometown",
                "defaultAddress.province","defaultAddress.district", "defaultAddress.village", "defaultAddress.ward", 
                "otherAddress.province","otherAddress.district", "otherAddress.village", "otherAddress.ward",
                "hometown.province","hometown.district", "hometown.village", "hometown.ward",
            ],
                where: {admincode: Like(`${user.username}%`)}
            });
            console.log(result);
            

            // const result = await getRepository(Person).createQueryBuilder("person")
            //     .innerJoinAndSelect("person.defaultAddress", "address")
            //     .innerJoinAndSelect("person.otherAddress", "address")
            //     .where("person.admincode: like ????")


            if (result) {
                return res.json({
                    status: 200,
                    messenger: " ",
                    result: result
                })
            }
            else {
                return res.json({
                    status: 400,
                    messenger: "Khong tim thay person"
                })
            }

            // const result = await getRepository(Person).createQueryBuilder("person")
            // .innerJoinAndSelect("person.admin","user");
            // console.log(result);
        }
        catch (e) {
            console.log(e);
            return res.json({
                status: 400,
                messenger: "Có lỗi get person"
            })
        }
    },

    //[POST] /person/create
    create: async (req: Request, res: Response) => {
        try {
            const { name, birthDay, gender, religion, level, job, defaultAddress, otherAddress, hometown } = req.body;

            let newPerson = new Person();
            newPerson.name = name;
            newPerson.birthDay = birthDay;
            newPerson.gender = gender;
            newPerson.religion = religion;
            newPerson.level = level;
            newPerson.job = job;
            let reqDefaultAddress = new Address();
            let reqOtherAddress = new Address();
            let reqHometown = new Address();

            let villageRepo = getRepository(Village);
            let provinceRepo = getRepository(Province);
            let districtRepo = getRepository(District);
            let wardRepo = getRepository(Ward);
            reqDefaultAddress.detail = defaultAddress.detail;
            let village = (await villageRepo.find({ code: defaultAddress.village }))[0];
            reqDefaultAddress.village = village;
            let ward = (await wardRepo.find({ code: defaultAddress.ward }))[0];
            reqDefaultAddress.ward = ward;
            let district = (await districtRepo.find({ code: defaultAddress.district }))[0];
            reqDefaultAddress.district = district;
            let province = (await provinceRepo.find({ code: defaultAddress.province }))[0];
            reqDefaultAddress.province = province;

            reqOtherAddress.detail = defaultAddress.detail;
            let village2 = (await villageRepo.find({ code: otherAddress.village }))[0];
            reqOtherAddress.village = village2;
            let ward2 = (await wardRepo.find({ code: otherAddress.ward }))[0];
            reqOtherAddress.ward = ward2;
            let district2 = (await districtRepo.find({ code: otherAddress.district }))[0];
            reqOtherAddress.district = district2;
            let province2 = (await provinceRepo.find({ code: otherAddress.province }))[0];
            reqOtherAddress.province = province2;

            let village3 = (await villageRepo.find({ code: hometown.village }))[0];
            reqHometown.village = village3;
            let ward3 = (await wardRepo.find({ code: hometown.ward }))[0];
            reqHometown.ward = ward3;
            let district3 = (await districtRepo.find({ code: hometown.district }))[0];
            reqHometown.district = district3;
            let province3 = (await provinceRepo.find({ code: hometown.province }))[0];
            reqHometown.province = province3;

            let addr = await getRepository(Address).save(reqDefaultAddress);
            let addr2 = await getRepository(Address).save(reqOtherAddress);
            let addr3 = await getRepository(Address).save(reqHometown);

            newPerson.defaultAddress = addr;
            newPerson.otherAddress = addr2;
            newPerson.hometown = addr3;
            newPerson.admin = res.locals.user;
            newPerson.admincode = res.locals.user.username;

            let pers = await getRepository(Person).save(newPerson);
            // let person = plainToClass(PersonTitleDto,pers , {
            //     excludeExtraneousValues: true,
            //   });
            let admin = plainToClass(UserTitleDto, res.locals.user, {
                excludeExtraneousValues: true,
            });
            let result = await getRepository(Person).find({
                where: {},
                relations: ["admin"]
            })

            return res.json({
                status: 200,
                messenger: "Thành công",
                person: result,
                //admin: admin
            })
        }
        catch (e) {
            console.log(e);
            return res.json({
                status: 400,
                messenger: "Có lỗi add person"
            })
        }
    },

    //[POST] /person/update
    update: async (req: Request, res: Response) => {
        try {
            const { name, birthDay, gender, religion, level, job, defaultAddress, otherAddress, hometown, id } = req.body;

            let newPerson = await getRepository(Person).findOne(id);
            console.log(newPerson);

            if (newPerson == null) {
                return res.json("Khong tim thay nguoi nay");
            }
            newPerson.name = name;
            newPerson.birthDay = birthDay;
            newPerson.gender = gender;
            newPerson.religion = religion;
            newPerson.level = level;
            newPerson.job = job;
            let reqDefaultAddress = new Address();
            let reqOtherAddress = new Address();
            let reqHometown = new Address();

            let villageRepo = getRepository(Village);
            let provinceRepo = getRepository(Province);
            let districtRepo = getRepository(District);
            let wardRepo = getRepository(Ward);
            reqDefaultAddress.detail = defaultAddress.detail;
            let village = (await villageRepo.find({ code: defaultAddress.village }))[0];
            reqDefaultAddress.village = village;
            let ward = (await wardRepo.find({ code: defaultAddress.ward }))[0];
            reqDefaultAddress.ward = ward;
            let district = (await districtRepo.find({ code: defaultAddress.district }))[0];
            reqDefaultAddress.district = district;
            let province = (await provinceRepo.find({ code: defaultAddress.province }))[0];
            reqDefaultAddress.province = province;

            reqOtherAddress.detail = defaultAddress.detail;
            let village2 = (await villageRepo.find({ code: otherAddress.village }))[0];
            reqOtherAddress.village = village2;
            let ward2 = (await wardRepo.find({ code: otherAddress.ward }))[0];
            reqOtherAddress.ward = ward2;
            let district2 = (await districtRepo.find({ code: otherAddress.district }))[0];
            reqOtherAddress.district = district2;
            let province2 = (await provinceRepo.find({ code: otherAddress.province }))[0];
            reqOtherAddress.province = province2;

            let village3 = (await villageRepo.find({ code: hometown.village }))[0];
            reqHometown.village = village3;
            let ward3 = (await wardRepo.find({ code: hometown.ward }))[0];
            reqHometown.ward = ward3;
            let district3 = (await districtRepo.find({ code: hometown.district }))[0];
            reqHometown.district = district3;
            let province3 = (await provinceRepo.find({ code: hometown.province }))[0];
            reqHometown.province = province3;

            let addr = await getRepository(Address).save(reqDefaultAddress);
            let addr2 = await getRepository(Address).save(reqOtherAddress);
            let addr3 = await getRepository(Address).save(reqHometown);

            newPerson.defaultAddress = addr;
            newPerson.otherAddress = addr2;
            newPerson.hometown = addr3;
            newPerson.admin = res.locals.user;

            let pers = await getRepository(Person).save(newPerson);
            // let person = plainToClass(PersonTitleDto,pers , {
            //     excludeExtraneousValues: true,
            //   });
            // let admin = plainToClass(UserTitleDto, res.locals.user , {
            //     excludeExtraneousValues: true,
            //   });
            // let result = await getRepository(Person).find({
            //     where:{},
            //     relations:["admin"]
            // })

            return res.json({
                status: 200,
                messenger: "Thành công",
                person: pers,
                //admin: admin
            })
        }
        catch (e) {
            console.log(e);
            return res.json({
                status: 400,
                messenger: "Có lỗi add person"
            })
        }
    }

};
