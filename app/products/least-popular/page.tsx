import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import OnSaleProducts from "@/components/products/OnSaleProducts";

const getOnSaleProducts = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/least-popular`,
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

export default async function OnSaleProductsPage() {
  const data = await getOnSaleProducts();

  return <OnSaleProducts onsaleProducts={data?.onsaleProducts} />;
}
