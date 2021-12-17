import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/user";
export const JWTmiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: string =req.headers["x-access-token"]?.toString()||req.headers.token?.toString()|| "";
  if (!token) {
    res.status(401);
    return res.send("Bạn chưa đăng nhập");
  }
  await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV as any,
    async (err: any, verifiedJwt: any) => {
      if (err) {
        res.status(401);
        return res.send("Bạn chưa đăng nhập");
      } else {
        if (!token) {
          res.status(401);
          return res.send("Bạn chưa đăng nhập");
        }
        var userRepo = getRepository(User);

        const user = await userRepo.findOne({
          where: {
            username: verifiedJwt.username,
          },
          relations: ["ward", "village", "province", "district"],
        });
        res.locals.user = user || null;
        
        next();
      }
      return;
    }
  );
};
