import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import { updateProfile } from "@/lib/contollers/userController";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { CustomNextApiRequest } from "@/interfaces/user";
import upload from "@/lib/utils/multer";

const router = createRouter<any, any>();

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const customUploadMiddleware = (req: any, res: any, next: any) => {
  return new Promise((resolve, reject) => {
    upload.array("image")(req, res, (err) => {
      if (err) {
        console.error(err);
        // return reject(err);
      }
      console.log("File saved successfully.");
      resolve(next());
    });
  });
};

router
  .use(isAuthenticatedUser, customUploadMiddleware)
  .put(async (req, res) => {
    await dbConnect();
    await updateProfile(req, res);
  });

export default router.handler({ onError });
