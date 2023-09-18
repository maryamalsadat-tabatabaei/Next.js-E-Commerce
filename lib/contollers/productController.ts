import type { NextApiRequest, NextApiResponse } from "next";
import { ProductModel } from "@/lib/models/product";
import APIFilters from "../utils/APIFilters";
import Product from "../interfaces/product";

interface CustomQuery {
  [key: string]: string;
}

export const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const productBody = req.body as Product;
  const product = await ProductModel.create(productBody);

  res.status(201).json({
    product,
  });
};

export const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (error: any) => void
) => {
  try {
    const numberPerPage = parseInt(req.query.numPerPage as string, 10) || 2;
    let currentPage = Math.max(1, parseInt(req.query.page as string, 10)) || 1;
    const productsCount = await ProductModel.countDocuments();

    const { page, ...filterParams } = req.query;

    if (filterParams) {
      currentPage = 1;
    }

    const apiFilters = new APIFilters(
      ProductModel.find(),
      req.query as CustomQuery
    )
      .search(["name", "description"])
      .filter();

    let products = await apiFilters.execute();
    const filteredProductsCount = products.length;

    products = await apiFilters
      .pagination(numberPerPage, currentPage)
      .query.clone();

    res.status(200).json({
      productsCount,
      numberPerPage,
      filteredProductsCount,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const productId = req.query.id as string;
  const product = await ProductModel.findById(productId);
  if (!product) res.status(404).json({ error: "Product not found" });

  res.status(200).json({ product });
};
