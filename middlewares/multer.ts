import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Set the storage engine for multer
const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const dest = "public/uploads/";

    // Ensure the directory exists or create it
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const fileName = `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

// Initialize the multer upload
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([{ name: "resume", maxCount: 1 }]);
