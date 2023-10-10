import axios from "axios";
import PopularProducts from "@/components/products/PopularProducts";

const getTopProducts = async () => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/top-purchased`
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }

  return data;
};

export default async function TopProductsPage() {
  const data = await getTopProducts();

  return <PopularProducts topProducts={data?.topProducts} />;
}
