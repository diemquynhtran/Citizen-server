import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const JWTmiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: string = req.headers["x-access-token"]?.toString() || "";
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
        res.locals.userId = verifiedJwt.user.id || null;
        next();
      }
      return;
    }
  );
};
