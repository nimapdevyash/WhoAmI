import { NextFunction, Request, Response } from "express";
import multer from "multer";

// Custom error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error: ", err);

  let statusCode = 500;
  let message = "Something went wrong";

  // Handle Multer file upload errors
  if (err instanceof multer.MulterError) {
    message = err.message;
    statusCode = 400;
  }

  // Custom validation or operational error
  if (err.name === "ValidationError") {
    message = err.message;
    statusCode = 400;
  }

  if (err.message?.includes("Only PDF files are allowed")) {
    message = err.message;
    statusCode = 400;
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File size should not exceed 20MB.";
    statusCode = 413;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
