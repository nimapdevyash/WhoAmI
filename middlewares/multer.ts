import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Set the storage engine
const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    const dest = "public/uploads/";
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    const fileName = `${
      path.parse(file.originalname).name
    }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

// File filter to only allow PDFs and correct field name
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) =>
  file.mimetype === "application/pdf"
    ? cb(null, true)
    : cb(
        new Error(
          "Only PDF files are allowed and the field name must be 'resume'."
        )
      );

// Multer upload middleware with 20MB limit and file filter
export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter,
}).fields([{ name: "resume", maxCount: 1 }]);
