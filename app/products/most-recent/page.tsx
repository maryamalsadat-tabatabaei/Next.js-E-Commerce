import axios from "axios";
import RecentProducts from "@/components/products/RecentProducts";

const getRecentProducts = async () => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/most-recent`
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }

  return data;
};

export default async function RecentProductsPage() {
  const data = await getRecentProducts();

  return <RecentProducts recentProducts={data?.recentProducts} />;
}
