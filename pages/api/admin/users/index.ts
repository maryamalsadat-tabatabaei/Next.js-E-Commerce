import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import { getUsers } from "@/lib/contollers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(async (req, res) => {
    await dbConnect();
    getUsers(req, res);
  });

export default router.handler({ onError });
