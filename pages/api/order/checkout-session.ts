import dbConnect from "@/lib/config/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import { CustomNextApiRequest } from "@/interfaces/user";
import { checkoutSession } from "@/lib/contollers/orderController";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).post(async (req, res) => {
  await dbConnect();
  checkoutSession(req, res);
});
export default router.handler({ onError });
