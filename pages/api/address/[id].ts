import dbConnect from "@/lib/config/dbConnect";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/lib/contollers/addressController";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import { CustomNextApiRequest } from "@/interfaces/user";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).get(async (req, res, next) => {
  await dbConnect();
  await getAddress(req, res, next);
});

router.use(isAuthenticatedUser).put(async (req, res, next) => {
  await dbConnect();
  await updateAddress(req, res, next);
});
router.use(isAuthenticatedUser).delete(async (req, res, next) => {
  await dbConnect();
  await deleteAddress(req, res, next);
});
export default router.handler({ onError });
