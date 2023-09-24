import axios from "axios";

import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import Shipping from "@/components/cart/Shipping";

export const metadata = {
  title: "Shipping Page",
};
const getAddresses = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data?.addresses;
};
export default async function ShippingPage() {
  const userAddressList = await getAddresses();
  return <Shipping userAddressList={userAddressList} />;
}
