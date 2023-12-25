import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserClaims } from "../types/user";
const SECRET: Secret = process.env.SECRET!;
const EXPIRY: number = Number(process.env.EXPIRY);

export const generateToken = (payload: UserClaims) => {
  console.log("Inside generateToken");
  return jwt.sign(payload, SECRET, { algorithm: "HS256", expiresIn: EXPIRY });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const encodeText = async (
  plainText: string | Buffer,
): Promise<string> => {
  let encoded = String(plainText);
  encoded = await bcrypt.hash(plainText, 10);
  console.log(encoded);
  return encoded;
};

export const isPasswordMaching = async (encoded: string, plain: string) => {
  return bcrypt.compare(plain, encoded);
};
