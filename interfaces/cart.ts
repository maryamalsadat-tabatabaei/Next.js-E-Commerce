export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  stock: number;
  quantity: number;
};

export type CheckoutInformation = {
  amount: number;
  totalAmount: number;
  tax: number;
  totalUnits: number;
};
