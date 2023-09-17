import ProductDetail from "@/components/products/ProductDetail";
import axios from "axios";

const getProduct = async ({ productId }: { productId: string }) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/products/${productId}`
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data?.product;
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productData = await getProduct({ productId: params.id });

  return <ProductDetail product={productData} />;
}
