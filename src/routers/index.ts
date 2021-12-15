import { Application } from "express";
import userRouter from "./user";

export const AppRouter = (app: Application) => {
  app.use("/user", userRouter);
};
