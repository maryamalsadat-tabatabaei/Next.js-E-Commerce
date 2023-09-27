import dbConnect from "@/lib/config/dbConnect";
import type { NextApiResponse } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import { CustomNextApiRequest } from "@/interfaces/user";
import {
  deleteProduct,
  updateProduct,
} from "@/lib/contollers/productController";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(async (req, res, next) => {
    await dbConnect();
    await updateProduct(req, res, next);
  });
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(async (req, res, next) => {
    await dbConnect();
    await deleteProduct(req, res, next);
  });
export default router.handler({ onError });
