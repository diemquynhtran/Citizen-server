import { Request, Response } from "express";
export const userController = {
  getUser: async (_: Request, res: Response) => {
    return res.send(200);
  },
};
