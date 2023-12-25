import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export type ApiResponse = {
  status: Number;
  message: String;
};

export interface CustomRequest extends Request {
  claims: JwtPayload | string;
}
