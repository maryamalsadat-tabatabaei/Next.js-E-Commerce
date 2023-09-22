import { Request } from "express";
import { Multer, FileFilterCallback } from "multer";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storageOptions = multer.diskStorage({
  destination: function (
    req,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "public/uploads");
  },
  filename: function (req, file: Express.Multer.File, cb: FileNameCallback) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    new Error("Unsupported file format. Upload only JPEG/JPG or PNG"), false;
  }
};

const upload: Multer = multer({
  storage: storageOptions,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
