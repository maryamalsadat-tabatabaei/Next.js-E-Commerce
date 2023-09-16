interface Product {
  name: string;
  description: string;
  price: number;
  seller: string;
  stock: number;
  category: string;
  author: string;
  publisher: string;
}
export default function ProductList({ data }: { data: Product }) {
  console.log("data", data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      products
    </main>
  );
}
