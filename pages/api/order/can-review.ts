import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { canReview } from "@/lib/contollers/orderController";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).get(async (req, res) => {
  await dbConnect();
  canReview(req, res);
});
export default router.handler({ onError });
