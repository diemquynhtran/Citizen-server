import { Application } from "express";
import userRoute from "./user";
import provinceRoute from "./province";
import districtRoute from "./district";
import wardRoute from "./ward";
import authRoute from "./auth";
import villageRoute from "./village";
import { roleRequire } from "../middlewares/role";
import { Role } from "../entities/user";
import { JWTmiddlewares } from "../middlewares/jwt";

export const AppRouter = (app: Application) => {
  app.use("/auth", authRoute);
  app.use("/user", JWTmiddlewares,userRoute);
  app.use("/province", JWTmiddlewares, roleRequire(Role.A1), provinceRoute);
  app.use("/district",JWTmiddlewares, roleRequire(Role.A1, Role.A2), districtRoute);
  app.use("/ward",JWTmiddlewares, roleRequire(Role.A1, Role.A2, Role.A3), wardRoute);
  app.use("/village", JWTmiddlewares, roleRequire(Role.A1,Role.A2,Role.A3,Role.B1), villageRoute);

};
