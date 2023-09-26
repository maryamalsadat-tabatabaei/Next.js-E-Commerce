import { OrderItem } from "@/interfaces/order";
import Image from "next/image";

const OrderProductItem = ({ product }: { product: OrderItem }) => {
  return (
    <figure className="flex flex-row mb-4">
      <div>
        <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
          <Image
            src={product?.image}
            height="60"
            width="60"
            alt={product.name}
          />
        </div>
      </div>
      <figcaption className="ml-3">
        <p>{product.name.substring(0, 35)}</p>
        <p className="mt-1 font-semibold">
          {product.quantity}x = ${product.price * product.quantity}
        </p>
      </figcaption>
    </figure>
  );
};
export default OrderProductItem;
