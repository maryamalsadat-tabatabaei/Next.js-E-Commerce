import type { NextApiResponse } from "next";
import { AddressModel } from "../models";
import Address, { FormAddress } from "@/interfaces/address";
import { CustomNextApiRequest } from "@/interfaces/user";
import ErrorHandler from "../utils/errorHandler";

export const createAddress = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  let addressBody = req.body;
  if (req.user) {
    addressBody.user = req.user._id;
  }
  const address = await AddressModel.create(addressBody);

  res.status(201).json({
    address,
  });
};

export const getAddresses = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const addresses = await AddressModel.find({ user: req.user?._id });
    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAddress = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const address = await AddressModel.findById(req.query.id);
    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAddress = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  let address = await AddressModel.findById(req.query.id);
  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  address = await AddressModel.findByIdAndUpdate(
    req.query.id,
    req.body as FormAddress
  );

  res.status(200).json({
    address,
  });
};

export const deleteAddress = async (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  let address = await AddressModel.findById(req.query.id);
  console.log("address", address);

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  await address.deleteOne();
  // await address.remove();

  res.status(200).json({
    success: true,
  });
};
