import dbConnect from "@/lib/config/dbConnect";
import { registerUser } from "@/lib/contollers/userController";
import type { NextApiRequest, NextApiResponse } from "next";

// const handler = nc({ onError });

// dbConnect();

// handler.post(registerUser);

// export default handler;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      registerUser(req, res);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
