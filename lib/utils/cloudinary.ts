import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        resource_type: "auto",
        folder: folder,
      })
      .then((result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { uploads, cloudinary };
