import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import {
  getUser,
  updateUser,
  deleteUser,
} from "@/lib/contollers/userController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(async (req, res) => {
    await dbConnect();
    getUser(req, res);
  });
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(async (req, res, next) => {
    await dbConnect();
    await updateUser(req, res, next);
  });
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(async (req, res, next) => {
    await dbConnect();
    deleteUser(req, res, next);
  });
export default router.handler({ onError });
