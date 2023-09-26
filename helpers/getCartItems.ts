import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export async function getCartItems(line_items: any) {
  const cartItems = await Promise.all(
    line_items?.data?.map(async (item: any) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      return {
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
        stock: Number(product.metadata.stock),
        publisher: product.metadata.publisher,
        seller: product.metadata.seller,
        category: product.metadata.category,
        author: product.metadata.author,
        description: product.metadata.description.substring(0, 50),
      };
    })
  );

  return cartItems;
}

// export async function getCartItems(line_items: any) {
//   return new Promise((resolve, reject) => {
//     let cartItems: any = [];

//     line_items?.data?.forEach(async (item: any) => {
//       const product = await stripe.products.retrieve(item.price.product);
//       const productId = product.metadata.productId;

//       cartItems.push({
//         product: productId,
//         name: product.name,
//         price: item.price.unit_amount_decimal / 100,
//         quantity: item.quantity,
//         image: product.images[0],
//         stock: Number(product.metadata.stock),
//         publisher: product.metadata.publisher,
//         seller: product.metadata.seller,
//         category: product.metadata.category,
//         author: product.metadata.author,
//         description: product.metadata.description.substring(0, 50),
//       });

//       if (cartItems.length === line_items?.data.length) {
//         resolve(cartItems);
//       }
//     });
//   });
// }
