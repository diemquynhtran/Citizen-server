import { Request, Response } from "express";
export const authController = {
  login: async (req: Request, res: Response) => {
    return res.send(200);
  },
};
