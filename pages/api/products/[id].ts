import dbConnect from "@/lib/config/dbConnect";
import { getProduct } from "@/lib/contollers/productController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    getProduct(req, res);
  }
  //   else if (req.method === "PUT") {
  //     // updating a single todo
  //     const body = req.body as UpdateTodoBody;
  //     const todo = await TodoModel.findById(id);
  //     if (todo) {
  //       todo.set({ ...body });
  //       await todo.save();
  //       res.status(200).json(todo.toJSON());
  //     } else {
  //       res.status(404);
  //     }
  //   } else if (req.method === "DELETE") {
  //     // deleting a single todo
  //     const todo = await TodoModel.findByIdAndRemove(id);
  //     if (todo) {
  //       res.status(200).json(todo.toJSON());
  //     } else {
  //       res.status(404);
  //     }
  //   }
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
