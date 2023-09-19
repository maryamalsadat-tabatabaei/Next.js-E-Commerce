import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models";
import User from "@/interfaces/user";

export const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userBody = req.body as User;

  let user;
  user = await UserModel.findOne({ email: userBody.email });

  if (user) {
    return res.status(404).json("Email Already exists");
  }

  user = await UserModel.create(userBody);
  res.status(201).json({
    user,
  });
};
