import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mime from "mime-types"; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadFileToCloudinary = async (filePath: string) => {
  try {
    // Validate file type
    const mimeType = mime.lookup(filePath);
    if (mimeType !== "application/pdf") {
      // Delete the invalid file
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`);
      });
      throw new Error("Only PDF files are allowed.");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // 'raw' for non-image files like PDFs
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`);
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });

    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};
