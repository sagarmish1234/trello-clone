import { Request, Response, Router } from "express";
import { CREATE, ID, UPDATE } from "../constant";
import { ZodError } from "zod";
import status, {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "http-status";
import { CommentCreateSchema, CommentUpdateSchema } from "../types/comment";
import prisma from "../db";
import { CustomRequest } from "../types/common";
import { UserClaims } from "../types/user";

const router = Router();
//TODO: api for creating a comment
router.post(CREATE, async (req: Request, res: Response) => {
  try {
    const commentRequest = CommentCreateSchema.parse(req.body);
    const user = (req as CustomRequest).claims as UserClaims;
    const comment = await prisma.comment.create({
      data: {
        ...commentRequest,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res
      .status(CREATED)
      .json({ status: CREATED, message: status[CREATED], comment });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Validation error:", err.errors);
      res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: status[BAD_REQUEST],
      });
    } else {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: status[INTERNAL_SERVER_ERROR],
      });
    }
  }
});

//TODO: api for updating a comment
router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const commentUpdateRequest = CommentUpdateSchema.parse(req.body);
    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        comment: commentUpdateRequest.comment,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.status(OK).json({ status: OK, message: status[OK], comment });
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Validation error:", err.errors);
      res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: status[BAD_REQUEST],
      });
    } else {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: status[INTERNAL_SERVER_ERROR],
      });
    }
  }
});

export default router;
