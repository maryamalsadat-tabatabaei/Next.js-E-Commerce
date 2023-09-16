import { createRouter } from "next-connect";
import onError from "@/lib/middlewares/error";
import dbConnect from "@/lib/config/dbConnect";
import { createProduct, getProducts } from "@/lib/contollers/productController";
import type { NextApiRequest, NextApiResponse } from "next";

// const router = createRouter<NextApiRequest, NextApiResponse>();

// router.post(async (req, res) => {
//   await dbConnect();
//   newProduct(req, res);
// });
// router.get(async (req, res) => {
//   await dbConnect();
//   getProducts(req, res);
// });
// export default router.handler({ onError });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      createProduct(req, res);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      getProducts(req, res);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
