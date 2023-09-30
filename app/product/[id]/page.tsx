import ProductDetail from "@/components/products/ProductDetail";
import axios from "axios";
import queryString from "query-string";

const getProduct = async ({
  productId,
  searchParams,
}: {
  productId: string;
  searchParams: { page: string };
}) => {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/${productId}?${searchQuery}`
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data;
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const data = await getProduct({ productId: params.id, searchParams });

  return (
    <ProductDetail
      product={data?.product}
      reviewsCount={data?.reviewsCount}
      numberPerPage={data?.numberPerPage}
    />
  );
}
