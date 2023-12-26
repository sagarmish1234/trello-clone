import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type ApiResponse = {
  status: Number;
  message: String;
};

export interface CustomRequest extends Request {
  claims: JwtPayload | string;
}
