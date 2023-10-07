import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import queryString from "query-string";
import MostRecentProducts from "@/components/admin/MostRecentProducts";

const getMostRecentProducts = async ({
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
    `${process.env.API_URL}/api/admin/products/most-recent?${searchQuery}`,
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

export default async function MostRecentProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const data = await getMostRecentProducts({ searchParams });

  return <MostRecentProducts data={data} />;
}
