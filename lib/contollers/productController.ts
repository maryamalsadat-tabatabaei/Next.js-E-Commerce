import type { NextApiRequest, NextApiResponse } from "next";
import { ProductModel } from "../models";
import APIFilters from "../utils/APIFilters";
import Product from "@/interfaces/product";
import { CustomNextApiRequest } from "@/interfaces/user";
import { cloudinary, uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";

interface CustomQuery {
  [key: string]: string;
}

export const createProduct = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  req.body.user = req.user?._id;
  const productBody = req.body as Product;

  const product = await ProductModel.create(productBody);

  res.status(201).json({
    product,
  });
};

export const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const numberPerPage = parseInt(req.query.numPerPage as string, 10) || 2;
    let currentPage = Math.max(1, parseInt(req.query.page as string, 10)) || 1;
    const productsCount = await ProductModel.countDocuments();

    const { page, ...filterParams } = req.query;

    // if (filterParams) {
    //   currentPage = 1;
    // }

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

    res.status(201).json({
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

export const uploadProductImages = async (
  req: any,
  res: any,
  next: Function
) => {
  let product = await ProductModel.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Product not found.", 404));

  if (req.files.length > 0) {
    const uploader = async (path: any) =>
      await uploads(path, "next-e-commerce/products");

    const productImageurls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const imgUrl = await uploader(path);
      productImageurls.push(imgUrl);
      fs.unlinkSync(path);
    }

    product = await ProductModel.findByIdAndUpdate(req.query.id, {
      images: productImageurls,
    });

    res.status(200).json({
      data: productImageurls,
      product,
    });
  }
};

export const updateProduct = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  let product = await ProductModel.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Product not found.", 404));
  product = await ProductModel.findByIdAndUpdate(req.query.id, req.body);
  res.status(200).json({
    product,
  });
};

export const deleteProduct = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  let product = await ProductModel.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Product not found.", 404));

  await product.deleteOne();
  // Deleting images associated with the product

  for (let i = 0; i < product.images.length; i++) {
    const res = await cloudinary.uploader.destroy(
      product.images[i].public_id as string
    );
  }
  res.status(200).json({
    success: true,
  });
};
