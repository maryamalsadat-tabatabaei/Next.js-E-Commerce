/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI:
      "mongodb+srv://mari:GidbPnAiw3taEyEG@node-project.6mr8s0d.mongodb.net/next-e-commerce",
    API_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "nextsecret@secretkeyforauth",
    GOOGLE_CLIENT_ID:
      "361634217496-id1skmjiti5kcuudo85dl3e2d47mkc13.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_ID: " Iv1.ac3573808652fdf6",
    GITHUB_SECRET: "39e0ee67da258cbf2fa738b83759b22029a864a7",
    CLOUD_NAME: "dcxzfwuoc",
    CLOUDINARY_API_KEY: "697296588947346",
    CLOUDINARY_API_SECRET: "N26upNNLmFVgqXnMZcsUdv4Qa9U",
  },
  images: { domains: ["res.cloudinary.com"] },
};

module.exports = nextConfig;
