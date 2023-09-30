import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createProductReview } from "@/lib/contollers/productController";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).put(async (req, res, next) => {
  await dbConnect();
  createProductReview(req, res, next);
});

export default router.handler({ onError });
