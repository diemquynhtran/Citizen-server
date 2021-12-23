import { Request, Response } from "express";
export const profileController = {
  updateInfo: async (req: Request, res: Response) => {
    return res.json({
      status: 200,
      messenger: ""
    })  },
  resetPassword: async (req: Request, res: Response) => {
    return res.json({
      status: 400,
      messenger: ""
    })
    },
};
