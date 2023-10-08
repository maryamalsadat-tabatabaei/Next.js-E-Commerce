import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getRecentProducts } from "@/lib/contollers/productController";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).get(async (req, res, next) => {
  await dbConnect();
  getRecentProducts(req, res, next);
});

export default router.handler({ onError });
