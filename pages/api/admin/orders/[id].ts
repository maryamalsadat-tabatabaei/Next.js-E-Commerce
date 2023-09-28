import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import {
  getOrder,
  updateOrder,
  deleteOrder,
} from "@/lib/contollers/orderController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .get(async (req, res) => {
    await dbConnect();
    getOrder(req, res);
  });
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(async (req, res, next) => {
    await dbConnect();
    await updateOrder(req, res, next);
  });
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(async (req, res, next) => {
    await dbConnect();
    deleteOrder(req, res, next);
  });
export default router.handler({ onError });
