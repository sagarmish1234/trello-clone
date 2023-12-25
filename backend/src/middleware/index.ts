import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";
import status, { UNAUTHORIZED } from "http-status";
import { UserClaims } from "../types/user";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  claims: JwtPayload | string;
}

//TODO: Middleware to authenticate requests using JWT
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.slice(7);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  //TODO: Verify the token
  let claims;
  try {
    claims = verifyToken(token);
    console.log(claims);
  } catch (err) {
    console.log(err);
    return res
      .status(UNAUTHORIZED)
      .json({ status: UNAUTHORIZED, message: status[UNAUTHORIZED] });
  }
  // Attach the decoded payload to the request for further use
  (req as CustomRequest).claims = claims;
  // Proceed to the next middleware or route handler
  next();
};
