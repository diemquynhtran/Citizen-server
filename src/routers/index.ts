import { Application } from "express";
import userRouter from "./user";
import provinceRoute from "./province";
import { roleRequire } from "../middlewares/role";
import { Role } from "../entities/user";
import { JWTmiddlewares } from "../middlewares/jwt";
export const AppRouter = (app: Application) => {
  app.use("/user", userRouter);
  app.use(
    "/province",
    // JWTmiddlewares, roleRequire(Role.A1),
    provinceRoute
  );
};
