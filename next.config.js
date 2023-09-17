/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI:
      "mongodb+srv://mari:GidbPnAiw3taEyEG@node-project.6mr8s0d.mongodb.net/next-e-commerce",
    API_URL: "http://localhost:3000/",
  },
  images: { domains: ["res.cloudinary.com"] },
};

module.exports = nextConfig;
