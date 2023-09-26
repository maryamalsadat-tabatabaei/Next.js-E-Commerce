import type { NextApiResponse } from "next";
import { CustomNextApiRequest } from "@/interfaces/user";
import ErrorHandler from "../utils/errorHandler";
import getRawBody from "raw-body";
import Stripe from "stripe";
import { CartItem } from "@/interfaces/cart";
import { getCartItems } from "@/helpers/getCartItems";
import { OrderModel } from "../models";
import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});
export const checkoutSession = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  const shippingInfo = body?.shippingInfo;

  const line_items = body?.cartItems?.map((item: any) => {
    // console.log("cartItemsssssssssssinstripr", item);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            productId: item.productId,
            seller: item.seller,
            publisher: item.publisher,
            stock: item.stock,
            category: item.category,
            author: item.author,
            description: item.description,
          },
        },
        unit_amount: item.price * 100,
      },
      tax_rates: ["txr_1NtziYEg12ZgjhENI6cpGMWe"],
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id?.toString(),
    mode: "payment",
    metadata: { shippingInfo },
    shipping_options: [
      { shipping_rate: "shr_1Nq4J2Eg12ZgjhENyGbZdIbN" },
      { shipping_rate: "shr_1Nq4E8Eg12ZgjhENJ6mdO400" },
    ],
    line_items,
    success_url: `${process.env.API_URL}/profile/orders?order_success=true`,
    cancel_url: `${process.env.API_URL}`,
  });

  res.status(200).json({
    url: session.url,
  });
};

export const webhook = async (req: any, res: NextApiResponse) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      let orderItems = await getCartItems(line_items);

      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };
      console.log("/////////////////", orderData);
      const order = await OrderModel.create(orderData);
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
