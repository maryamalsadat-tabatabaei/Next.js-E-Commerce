import dbConnect from "@/lib/config/dbConnect";
import {
  createAddress,
  getAddresses,
} from "@/lib/contollers/addressController";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticatedUser } from "@/lib/middlewares/requireAuth";
import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import { CustomNextApiRequest } from "@/interfaces/user";

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

router.use(isAuthenticatedUser).post(async (req, res) => {
  await dbConnect();
  await createAddress(req, res);
});

router.use(isAuthenticatedUser).get(async (req, res) => {
  await dbConnect();
  getAddresses(req, res);
});
export default router.handler({ onError });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();
//   if (req.method === "POST") {
//     try {
//       createAddress(req, res);
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else if (req.method === "GET") {
//     try {
//       getAddresses(req, res);
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
