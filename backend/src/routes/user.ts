import { Router } from "express";
import prisma from "../db";
import { CREATE, LOGIN, ME } from "../constant";
import {
  UserClaims,
  UserClaimsSchema,
  UserCreateSchema,
  UserLoginRequest,
} from "../types/user";
import { Request, Response } from "express";
import { error } from "console";
import { ZodError } from "zod";
import status, { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "http-status";
import { encodeText, generateToken, isPasswordMaching } from "../util/jwt";
import { CustomRequest } from "../types/common";
import { authenticateToken } from "../middleware";

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
      res.status(200).json({ status: 200, token });
    } else {
      res
        .status(UNAUTHORIZED)
        .json({ status: UNAUTHORIZED, message: "Invalid credentials" });
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
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: status[INTERNAL_SERVER_ERROR],
      });
    }
  }
});

//TODO: api for fetching the user from token
router.get(ME, authenticateToken, async (req: Request, res: Response) => {
  const claims = (req as CustomRequest).claims;
  res
    .status(OK)
    .json({ status: status[OK], claims: UserClaimsSchema.parse(claims) });
});

export default router;
