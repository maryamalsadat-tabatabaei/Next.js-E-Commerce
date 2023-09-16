import type { NextApiRequest, NextApiResponse } from "next";
import { ProductModel } from "@/lib/models/product";

interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  seller: string;
  stock: number;
  category: string;
  author: string;
  publisher: string;
}

export const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productBody = req.body as CreateProductBody;
  const product = await ProductModel.create(productBody);

  res.status(201).json({
    product,
  });
};

export const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const products = await ProductModel.find();
  res.status(200).json({
    products,
  });
};
