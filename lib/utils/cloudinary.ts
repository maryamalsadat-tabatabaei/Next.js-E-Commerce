import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
  public_id: string;
  url: string;
}

const uploads = (file: string, folder: string): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result: UploadApiResponse) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export { uploads, cloudinary };
