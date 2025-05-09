import { Response } from "express";

// Failure response helper
const sendError = (
  res: Response,
  message: string = "Somethings Went Wrong",
  statusCode: number = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default sendError ;