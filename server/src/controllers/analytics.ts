import { getRepository } from "typeorm";
import { Person } from "../entities/person";
import { Request, Response } from "express";


export const analyticsController = {
    //[POST] person/analytics/gender
    gender: async (req: Request, res: Response) => {
       try {
           //console.log(req.params);
           
        //const code = req.params._code;
        const code = req.body.code;        
        let personRepo = await getRepository(Person).createQueryBuilder("person")
        //.addSelect("COUNT()","tong")
        .select("person.gender","gender")
        .addSelect("IFNULL(COUNT(person.gender),0)", "tong")
        .where("person.admincode Like :code", {code: `${code}%`})
        .groupBy("person.gender")
        .getRawMany()
        ;
        //console.log(personRepo);
        return res.json({
            status: 200,
            result: [
                {
                    "label":"male",
                    "count": Number(personRepo[0].tong)
                },
                {
                    "label":"female",
                    "count":Number(personRepo[1].tong)
                }
            ]
        })
       }
       catch (e) {
           console.log(e);
           return res.json({
            status: 400,
            messenger:"Loi gender"
        })
       }
    },
    level: async (req: Request, res: Response) => {
        try {
         const code = req.body.code;
         let personRepo = await getRepository(Person).createQueryBuilder("person")
         //.addSelect("COUNT()","tong")
         .select("person.level","level")
         .addSelect("IFNULL(COUNT(person.level),0)", "tong")
         .where("person.admincode Like :code", {code: `${code}%`})
         .groupBy("person.level")
         .getRawMany()
         ;
         console.log(personRepo);
         
         const result = {
             "0/12":"0",
            "1/12": "0",
            "2/12": "0",
            "3/12": "0",
            "4/12": "0",
            "5/12": "0",
            "6/12": "0",
            "7/12": "0",
            "8/12": "0",
            "9/12": "0",
            "10/12": "0",
            "11/12": "0",
            "12/12": "0"
         }
         console.log(typeof(personRepo[0].level));
         console.log(typeof("10/12"));
         
         let i=0;
        //  result["0/12"] = personRepo[0].tong;
        //  result["1/12"] = personRepo[1].tong;
        //  result["2/12"] = personRepo[2].tong;
        //  result["3/12"] = personRepo[3].tong;
        //  result["4/12"] = personRepo[4].tong;
        //  result["5/12"] = personRepo[5].tong;
        //  result["6/12"] = personRepo[6].tong;
        //  result["7/12"] = personRepo[7].tong;
        //  result["8/12"] = personRepo[8].tong;
        //  result["9/12"] = personRepo[9].tong;
        //result["10/12"] = personRepo[0].tong;
        //  result["11/12"] = personRepo[11].tong;
        //  result["12/12"] = personRepo[12].tong;
         //console.log(result);
         

         return res.json({
             status: 200,
             result: result
         })
        }
        catch (e) {
            console.log(e);
            return res.json({
             status: 400,
             messenger:"Loi level"
         })
        }
     },

    age: async (req: Request, res: Response) => {
        try {
            const code = req.body.code;
            
        let age1 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        //.andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>-")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<11")
        .getRawMany();
        //result["0-10"] = age1[0].num;
        let age2 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>10")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<21")
        .getRawMany();
        //result["11-20"] = age2[0].num;
        let age3 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>20")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<31")
        .getRawMany();
        //result["21-30"]= age3[0].num;
        let age4 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>30")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<41")
        .getRawMany();
        //result["31-40"] = age4[0].num;
        let age5 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>40")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<51")
        .getRawMany();
        //result["41-50"] = age5[0].num;
        let age6 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>50")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<61")
        .getRawMany();
        //result["51-60"] = age6[0].num;
        let age7 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>60")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<71")
        .getRawMany();
        //result["61-70"] = age7[0].num;
        let age8 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>70")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<81")
        .getRawMany();
        //result["71-80"] = age8[0].num;
        let age9 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>80")
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<91")
        .getRawMany();
        //result["81-90"] = age9[0].num;
        let age10 = await getRepository(Person).createQueryBuilder("person")
        .select("COUNT(person.name)","num")
        .where("person.admincode Like :code", {code: `${code}%`})
        .andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)>90")
        //.andWhere("ROUND(DATEDIFF(CURDATE(),person.birthDay)/365,0)<")
        .getRawMany();
        //result["91-100"] = age10[0].num;
        return res.json({
            status: 200,
            result: [
                {
                    "label":"0-10",
                    "value": Number(age1[0].num)
                },
                {
                    "label":"10-20",
                    "value": Number(age2[0].num)
                },
                {
                    "label":"20-30",
                    "value": Number(age3[0].num)
                },
                {
                    "label":"30-40",
                    "value": Number(age4[0].num)
                },
                {
                    "label":"40-50",
                    "value": Number(age5[0].num)
                },
                {
                    "label":"50-60",
                    "value": Number(age6[0].num)
                },
                {
                    "label":"60-70",
                    "value": Number(age7[0].num)
                },
                {
                    "label":"70-80",
                    "value": Number(age8[0].num)
                },
                {
                    "label":"80-90",
                    "value": Number(age9[0].num)
                },
                {
                    "label":">90",
                    "value": Number(age10[0].num)
                }
            ]
        })
        }
        catch (e) {
            console.log(e);
            return res.json({
                status: 400,
                messenger:"Loi gender"
            })
        }
    },


}