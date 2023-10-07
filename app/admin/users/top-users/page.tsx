import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import queryString from "query-string";
import UserCharts from "@/components/admin/TopUsers";

const getTopUsers = async ({
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
    `${process.env.API_URL}/api/admin/users/top-users?${searchQuery}`,
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

export default async function TopUsersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const data = await getTopUsers({ searchParams });

  return <UserCharts data={data} />;
}
