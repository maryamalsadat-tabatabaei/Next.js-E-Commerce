interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null | number;
  livemode: boolean;
  lookup_key: null | string;
  metadata: {
    productId: string;
    quantity: number;
    publisher: string;
    category: string;
    author: string;
    description: string;
  };
  nickname: null | string;
  product: string;
  recurring: null | any;
  tax_behavior: string;
  tiers_mode: null | string;
  transform_quantity: null | string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface LineItem {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  price: Price;
}

export interface LineItemsResponse {
  object: string;
  data: LineItem[];
  has_more: boolean;
  url: string;
}

// line_itemssssssssss {
//   object: 'list',
//   data: [
//     {
//       id: 'li_1NuQ12Eg12ZgjhENPEgVDfw0',
//       object: 'item',
//       amount_discount: 0,
//       amount_subtotal: 2598,
//       amount_tax: 390,
//       amount_total: 2988,
//       currency: 'usd',
//       description: 'AmazonBasics Desktop Mini Condenser Microphone',
//       price: [Object],
//       quantity: 2
//     },
//     {
//       id: 'li_1NuQ12Eg12ZgjhENM6q28rf6',
//       object: 'item',
//       amount_discount: 0,
//       amount_subtotal: 5598,
//       amount_tax: 840,
//       amount_total: 6438,
//       currency: 'usd',
//       description: 'Infinite Horizons',
//       price: [Object],
//       quantity: 2
//     },
//     {
//       id: 'li_1NuQ12Eg12ZgjhENsE6etBrs',
//       object: 'item',
//       amount_discount: 0,
//       amount_subtotal: 4998,
//       amount_tax: 750,
//       amount_total: 5748,
//       currency: 'usd',
//       description: 'Whispers in the Shadows',
//       price: [Object],
//       quantity: 2
//     },
//     {
//       id: 'li_1NuQ12Eg12ZgjhENhaWJdOVe',
//       object: 'item',
//       amount_discount: 0,
//       amount_subtotal: 2699,
//       amount_tax: 405,
//       amount_total: 3104,
//       currency: 'usd',
//       description: 'In Pursuit of Truth',
//       price: [Object],
//       quantity: 1
//     }
//   ],
//   has_more: false,
//   url: '/v1/checkout/sessions/cs_test_b18jKn0jUNn64nzlp3dlSNwpONLSI2Zq3tEd7C9Ym1X3HDaMhDuIedNVtI/line_items'
// } itemPrice {
//   id: 'price_1NuQ12Eg12ZgjhENTwEa1PKr',
//   object: 'price',
//   active: false,
//   billing_scheme: 'per_unit',
//   created: 1695691484,
//   currency: 'usd',
//   custom_unit_amount: null,
//   livemode: false,
//   lookup_key: null,
//   metadata: {},
//   nickname: null,
//   product: 'prod_OhP63XO7ObmsgE',
//   recurring: null,
//   tax_behavior: 'unspecified',
//   tiers_mode: null,
//   transform_quantity: null,
//   type: 'one_time',
//   unit_amount: 1299,
//   unit_amount_decimal: '1299'
// }
