import axios from "axios";
import OnSaleProducts from "@/components/products/OnSaleProducts";

const getOnSaleProducts = async () => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/least-popular`
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
