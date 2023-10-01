import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import upload from "@/lib/utils/multer";
import { uploadProductImages } from "@/lib/contollers/productController";

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
  .use(isAuthenticatedUser, authorizeRoles("admin"), customUploadMiddleware)
  .post(async (req, res, next) => {
    await dbConnect();
    await uploadProductImages(req, res, next);
  });

export default router.handler({ onError });
