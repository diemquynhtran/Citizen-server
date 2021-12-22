import jwt from "jsonwebtoken";
import { Address } from "../entities/address";

export const JWTService = {
  generate: (payload : any) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET_TV as any, {
      expiresIn: 1400 * 24, // expires in 24 hours
    });
  },
};
