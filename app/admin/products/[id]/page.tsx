import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async ({ productId }: { productId: string }) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/${productId}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data;
};

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect("/");
  }
  const data = await getProduct({ productId: params?.id });

  return <UpdateProduct productItem={data?.product} productId={params?.id} />;
}
