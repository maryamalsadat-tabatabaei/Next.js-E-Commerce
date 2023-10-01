import Products from "@/components/admin/Products";
import axios from "axios";
import queryString from "query-string";

export const metadata = {
  title: "Next.js 13 E-Commerce App",
};
const getProducts = async (searchParams: { page: number | string }) => {
  const urlParams = {
    page: searchParams.page,
  };
  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    page: number | string;
  };
}) {
  const productData = await getProducts(searchParams);
  return <Products data={productData} />;
}
