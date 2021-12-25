import { Application } from "express";
import userRoute from "./user";
import provinceRoute from "./province";
import districtRoute from "./district";
import wardRoute from "./ward";
import authRoute from "./auth";
import personRoute from "./person";
import villageRoute from "./village";
import { roleRequire } from "../middlewares/role";
import { Role } from "../entities/user";
import { JWTmiddlewares } from "../middlewares/jwt";

export const AppRouter = (app: Application) => {
  app.use("/auth", authRoute);
  app.use("/user", JWTmiddlewares,userRoute);
  app.use("/province", JWTmiddlewares, provinceRoute);
  app.use("/district",JWTmiddlewares, districtRoute);
  app.use("/ward",JWTmiddlewares, wardRoute);
  app.use("/village", JWTmiddlewares, villageRoute);
  app.use("/person", JWTmiddlewares, personRoute);

};
