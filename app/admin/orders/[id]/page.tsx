import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import UpdateOrder from "@/components/admin/UpdateOrder";

const getOrder = async ({ orderId }: { orderId: string }) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/${orderId}`,
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

export default async function UpdateOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect("/");
  }
  const data = await getOrder({ orderId: params?.id });

  return <UpdateOrder order={data?.order} />;
}
