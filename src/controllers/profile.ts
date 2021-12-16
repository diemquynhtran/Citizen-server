import { Request, Response } from "express";
export const profileController = {
  updateInfo: async (req: Request, res: Response) => {
    return res.send(200);
  },
  resetPassword: async (req: Request, res: Response) => {
    return res.send();
  },
};
