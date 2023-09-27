import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import { createProduct } from "@/lib/contollers/productController";
import type { NextApiResponse } from "next";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/lib/middlewares/requireAuth";
import { CustomNextApiRequest } from "@/interfaces/user";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .post(async (req, res) => {
    await dbConnect();
    createProduct(req, res);
  });

export default router.handler({ onError });
