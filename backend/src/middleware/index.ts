import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt";
import status, { UNAUTHORIZED } from "http-status";
import { CustomRequest } from "../types/common";

//TODO: Middleware to authenticate requests using JWT
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //TODO: Get the token from the Authorization header
  const token = req.headers.authorization?.slice(7);
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: status[UNAUTHORIZED] });
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
  //TODO: Attach the decoded payload to the request for further use
  (req as CustomRequest).claims = claims;
  //TODO: Proceed to the next middleware or route handler
  next();
};
