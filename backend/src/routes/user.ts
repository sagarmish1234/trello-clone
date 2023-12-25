import { Router } from "express";
import prisma from "../db";
import { CREATE, LOGIN } from "../constant";
import {
  UserClaims,
  UserClaimsSchema,
  UserCreateSchema,
  UserLoginRequest,
} from "../types/user";
import { Request, Response } from "express";
import { error } from "console";
import { ZodError } from "zod";
import { encodeText, generateToken, isPasswordMaching } from "../util/jwt";

const router = Router();

// TODO: API for register user

router.post(CREATE, async (req: Request, res: Response): Promise<void> => {
  try {
    const userRequest = UserCreateSchema.parse(req.body);
    const user = await prisma.user.create({
      data: {
        email: userRequest.email,
        password: await encodeText(userRequest.password),
        lastName: userRequest.lastName,
        firstName: userRequest.firstName,
      },
    });
    console.log(user);
    res.status(200).json({ status: 200, message: "Request success" });
  } catch (err) {
    if (error instanceof ZodError) {
      console.error("Validation error:", error.errors);
      res.status(400).json({
        status: 400,
        message: "Validation error",
      });
    } else {
      console.log("Unexpected error:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
});

//TODO: API for generating the json token for authentication

router.post(LOGIN, async (req: Request, res: Response) => {
  try {
    const userLoginRequest = UserLoginRequest.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: userLoginRequest.email,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true,
        password: true,
      },
    });
    console.log(user);
    let token;
    if (
      user != null &&
      (await isPasswordMaching(user.password, userLoginRequest.password))
    ) {
      token = generateToken(user as UserClaims);
      res
        .status(200)
        .json({ status: 200, token, claims: UserClaimsSchema.parse(user) });
    } else {
      res.status(401).json({ status: 401, message: "Invalid credentials" });
    }
  } catch (err) {
    if (error instanceof ZodError) {
      console.error("Validation error:", error.errors);
      res.status(400).json({
        status: 400,
        message: "Validation error",
      });
    } else {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
});

export default router;
