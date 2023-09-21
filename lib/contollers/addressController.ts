import type { NextApiResponse } from "next";
import { AddressModel } from "../models";
import Address from "@/interfaces/address";
import { CustomNextApiRequest } from "@/interfaces/user";

export const createAddress = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  let addressBody = req.body as Address;

  if (req.user) {
    addressBody.user = req.user._id as string;
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
  res: NextApiResponse
) => {
  try {
    const address = await AddressModel.findById({ req.query.id});
    res.status(200).json({ address});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};