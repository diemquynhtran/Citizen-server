import { Application } from "express";
import userRouter from "./user";
import provinceRoute from "./province";
import districtRoute from "./district";
import authRouter from "./auth";
import { roleRequire } from "../middlewares/role";
import { Role } from "../entities/user";
import { JWTmiddlewares } from "../middlewares/jwt";

export const AppRouter = (app: Application) => {
  app.use("/auth", authRouter);
  app.use("/user", JWTmiddlewares,userRouter);
  app.use("/province", JWTmiddlewares, roleRequire(Role.A1), provinceRoute);
  app.use("/district",JWTmiddlewares, roleRequire(Role.A1, Role.A2), districtRoute);
};
