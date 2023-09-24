import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models";
import User, { UpdatePasswordForm } from "@/interfaces/user";
import { uploads } from "../utils/cloudinary";
import { CustomNextApiRequest } from "@/interfaces/user";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: CustomNextApiRequest,
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

export const updateProfile = async (req: any, res: any) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: {
      public_id: "",
      url: "",
    },
  };
  console.log("Received file:", req.files);

  if (req.files.length > 0) {
    const uploader = async (path: any) =>
      await uploads(path, "next-e-commerce/avatars");

    const file = req.files[0];
    const { path } = file;

    const avatarResponse = await uploader(path);
    fs.unlinkSync(path);
    newUserData.avatar = avatarResponse;
  }

  if (req.user) {
    const user = await UserModel.findByIdAndUpdate(req.user._id, newUserData);
    res.status(200).json({
      user,
    });
  }
};

export const updatePassword = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  const userBody = req.body as UpdatePasswordForm;
  const user = await UserModel.findById(req.user?._id).select("+password");

  if (user) {
    const isPasswordMatched = await bcrypt.compare(
      userBody.currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (userBody.newPassword !== userBody.confirmPassword) {
      return next(
        new ErrorHandler("New assword and confirm password does not match", 400)
      );
    }

    user.password = userBody.newPassword;
    await user.save();
  } else {
    throw new Error("Invalid user");
  }

  res.status(200).json({
    success: true,
  });
};
