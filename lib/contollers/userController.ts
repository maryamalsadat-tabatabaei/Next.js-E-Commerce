import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../models";
import User from "@/interfaces/user";
import { uploads } from "../utils/cloudinary";
import { CustomNextApiRequest } from "@/interfaces/user";
import fs from "fs";

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

// import upload from "../utils/multer";
// import { Express } from "express";

// interface MulterFile {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   path: string;
//   buffer: Buffer;
// }

// interface MulterRequest extends NextApiRequest {
//   files: MulterFile[];
// }

// let uploader = upload.array("images");

// const POST = async (request: NextApiRequest, response: NextApiResponse) => {
//   try {
//     await connect();
//     uploader(request as any, response as any, async function (err) {
//       if (err) {
//         return new NextResponse("Fehler beim Hochladen der Bilder", {
//           status: 400,
//         });
//       }
//       const data = (request as MulterRequest).body;
//       data.images = (request as MulterRequest).files.map(
//         (file) => file.filename
//       );
//       const newBlogPost = new BlogPost(data);
//       await newBlogPost.save();
//       return new NextResponse(JSON.stringify(newBlogPost), { status: 201 });
//     });
//   } catch (error) {
//     return new NextResponse("Fehler beim Erstellen des BlogPosts", {
//       status: 400,
//     });
//   }
// };
