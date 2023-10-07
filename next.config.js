/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI:
      "mongodb+srv://mari:GidbPnAiw3taEyEG@node-project.6mr8s0d.mongodb.net/next-e-commerce",
    // API_URL: "http://localhost:3000/",
    // NEXTAUTH_URL: "http://localhost:3000/",
    API_URL: "https://next-js-e-commerce-three-dusky.vercel.app",
    NEXTAUTH_URL: "https://next-js-e-commerce-three-dusky.vercel.app",
    NEXTAUTH_SECRET: "nextsecret@secretkeyforauth",
    GOOGLE_CLIENT_ID:
      "361634217496-id1skmjiti5kcuudo85dl3e2d47mkc13.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_ID: "Iv1.ac3573808652fdf6",
    GITHUB_SECRET: "39e0ee67da258cbf2fa738b83759b22029a864a7",
    CLOUD_NAME: "dcxzfwuoc",
    CLOUDINARY_API_KEY: "697296588947346",
    CLOUDINARY_API_SECRET: "N26upNNLmFVgqXnMZcsUdv4Qa9U",
    STRIPE_PUBLIC_KEY:
      "pk_test_51NjtpGEg12ZgjhENFjNdBsbSEZLMwpZjGgDZ3sDgUOEh8nV8HFKSc9TOU9xFLfOdgrxzolrlxWBezYgJizyQNJAw00b39qgW7M",
    STRIPE_SECRET_KEY:
      "sk_test_51NjtpGEg12ZgjhENxFZlWdI7QuUfSxhX74D1GY3TENjS5G6FuRcYyHxyP9jZfljt0qoICCDc7ZHAQNW2mcqrFvM300yU1OOlxE",
    STRIPE_WEBHOOK_SECRET:
      "whsec_3d27ea7d1c17af1ab8909ca4fd47dd27fed6ea46af4b773f2fc53579ce45d653",
    MAPBOX_PUBLIC_TOKEN:
      "pk.eyJ1IjoibWFyaTcwIiwiYSI6ImNsbmM2NmRjYjBkem8ya3J4aGtwdzZub3oifQ.06u2S3fCV9MwwDN0HUDTMQ",
    MAPGL_TOKEN:
      "pk.eyJ1IjoibWFyaTcwIiwiYSI6ImNrdW1xZHJxZzE1ZW0yem1iYzl6Y2s0a3kifQ.Q4ZacWgSqFlrJ1cd_wQXqQ",
  },
  images: { domains: ["res.cloudinary.com"] },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
//>stripe listen --events checkout.session.completed --forward-to localhost:3000/api/order/webhook
