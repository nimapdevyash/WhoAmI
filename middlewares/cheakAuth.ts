import { Request, Response, NextFunction } from "express";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validUsername = process.env.USER_NAME;
  const validPassword = process.env.USER_PASSWORD;

  if (!validUsername || !validPassword) {
    return next(new Error("Server misconfiguration: USER_NAME or USER_PASSWORD missing in .env"));
  }

  const username = req.body["user_name"];
  const password = req.body["user_password"];

  if (username !== validUsername || password !== validPassword) {
    return next(new Error("Invalid Credentials in Headers"));
  }

  next() ;

}

export default checkAuth;
