import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import PieChart from "@/components/products/stats/PieChart";
import BarChart from "@/components/products/stats/BarChart";

const getStats = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/products/stats`,
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

export default async function StatsPage() {
  const data = await getStats();

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4">
      <BarChart monthlyStats={data?.monthlyStats} />
      <PieChart defaultStats={data?.defaultStats} />
    </div>
  );
}
