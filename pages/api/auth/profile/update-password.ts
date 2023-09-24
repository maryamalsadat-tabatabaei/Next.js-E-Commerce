import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import { CustomNextApiRequest } from "@/interfaces/user";
import { updatePassword } from "@/lib/contollers/userController";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).put(async (req, res, next) => {
  await dbConnect();
  updatePassword(req, res, next);
});

export default router.handler({ onError });
