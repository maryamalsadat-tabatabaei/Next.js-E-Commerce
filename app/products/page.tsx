import ProductList from "@/components/products/ProductList";
import axios from "axios";
import queryString from "query-string";

export const metadata = {
  title: "Products Page",
};
const getProducts = async (searchParams: {
  keyword: string;
  page: number | string;
  category: string;
  ratings: number | string;
  minPrice: string;
  maxPrice: string;
}) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    ratings: searchParams.ratings,
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

export default async function HomeProductsPage({
  searchParams,
}: {
  searchParams: {
    keyword: string;
    page: number | string;
    category: string;
    ratings: number | string;
    minPrice: string;
    maxPrice: string;
  };
}) {
  const productData = await getProducts(searchParams);
  const data = await getOnSaleProducts();

  return (
    <ProductList data={productData} onsaleProducts={data?.onsaleProducts} />
  );
}
