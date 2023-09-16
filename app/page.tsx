import ProductList from "@/components/products/ProductList";
import axios from "axios";

const getProducts = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/api/products`);
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data;
};

export default async function Home() {
  const productData = await getProducts();
  return <ProductList data={productData} />;
}
