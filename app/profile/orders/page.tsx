import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import queryString from "query-string";
import OrderList from "@/components/order/OrderList";

const getOrders = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/order?${searchQuery}`,
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

export default async function UpdateAddressPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const orders = await getOrders({ searchParams });

  return <OrderList orders={orders} />;
}
