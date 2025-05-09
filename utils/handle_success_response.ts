import { Response } from "express";

// Success response helper
const sendSuccess = (
  res: Response,
  message: string = "Request Executed Successfully",
  data: any = {},
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default sendSuccess ;