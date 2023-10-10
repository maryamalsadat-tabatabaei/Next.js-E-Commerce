import type { NextApiRequest, NextApiResponse } from "next";
import { OrderModel, ProductModel } from "../models";
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
      ProductModel.find().sort({ createdAt: -1 }),
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
  try {
    const productId = req.query.id as string;
    let product = await ProductModel.findById(productId).populate(
      "reviews.user"
    );

    if (product) {
      const numberPerPage = 2;
      let currentPage =
        Math.max(1, parseInt(req.query.page as string, 10)) || 1;
      const skip = (currentPage - 1) * numberPerPage;

      const reviewsCount = product.reviews.length || 0;

      (product = await ProductModel.findById(productId).populate({
        path: "reviews.user",
        options: {
          skip,
          limit: numberPerPage,
        },
      })),
        res.status(200).json({
          reviewsCount,
          numberPerPage,
          product,
        });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

export const createProductReview = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { rating, comment, productId } = req.body;
  const userId = req?.user?._id;
  if (userId) {
    const review = {
      user: userId,
      rating: Number(rating),
      comment,
    };

    let product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === userId?.toString()
    );

    if (isReviewed) {
      product?.reviews.forEach((review) => {
        if (review.user.toString() === userId?.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product?.reviews.push(review);
    }

    product.ratings =
      product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product?.save();

    res.status(200).json({
      success: true,
    });
  }
};

async function getTopPurchasedProducts(
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  const numberPerPage = 10;
  let currentPage = Math.max(1, parseInt(req.query.page as string, 10)) || 1;
  const skip = (currentPage - 1) * numberPerPage;

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const result = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: lastMonth },
        orderStatus: "Delivered",
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $group: {
        _id: "$orderItems.product",
        totalQuantity: { $sum: "$orderItems.quantity" },
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $limit: 10,
    },
    // {
    //   $skip: skip,
    // },
    // {
    //   $limit: numberPerPage,
    // },
  ]);
  // Get the total count of top products
  const productsCount = Math.min(result.length, 10);

  let topProducts = await Promise.all(
    result.map(async (item) => {
      const product = await ProductModel.findById(item._id);
      return { ...product?.toObject(), totalQuantity: item.totalQuantity };
    })
  );
  // topProducts = topProducts.slice(skip, currentPage * numberPerPage);

  res.status(200).json({
    topProducts,
    // productsCount,
    // numberPerPage,
  });
}

export default getTopPurchasedProducts;

export const getLeastPopularProducts = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const onsaleProducts = await ProductModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "orderItems.product",
          as: "orderItems",
        },
      },
      {
        $addFields: {
          purchaseCount: { $size: "$orderItems" },
        },
      },
      {
        $match: {
          purchaseCount: { $lte: 1 },
        },
      },
      {
        $sort: {
          createdAt: 1,
          price: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      onsaleProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecentProducts = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const recentProducts = await ProductModel.find({})
      .sort({ createdAt: -1, price: -1 })
      .limit(10);

    res.status(200).json({
      recentProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStats = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const userId = req?.user?._id;
  const lastSixMonths = new Date();
  lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);
  console.log("lastSixMonths", lastSixMonths);
  try {
    const categoryStats = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastSixMonths },
          orderStatus: { $in: ["Processing", "Shipped", "Delivered"] },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.category",
          totalQuantity: { $sum: "$orderItems.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      // {
      //   $limit: 10,
      // },
      {
        $project: {
          category: "$_id",
          totalQuantity: 1,
          _id: 0,
        },
      },
    ]);

    console.log("categoryStats", categoryStats);
    const monthlyStats = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: lastSixMonths },
          orderStatus: { $in: ["Processing", "Shipped", "Delivered"] },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          totalQuantity: { $sum: "$orderItems.quantity" },
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     month: "$_id.month",
      //     totalQuantity: 1,
      //   },
      // },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
              ],
              default: "Invalid Month",
            },
          },
          totalQuantity: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    console.log("monthlyStats", monthlyStats);

    res.status(200).json({
      defaultStats: categoryStats,
      monthlyStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
