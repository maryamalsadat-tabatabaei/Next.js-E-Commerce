import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { getTopUsers } from "@/lib/contollers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).get(async (req, res, next) => {
  await dbConnect();
  getTopUsers(req, res, next);
});

export default router.handler({ onError });
