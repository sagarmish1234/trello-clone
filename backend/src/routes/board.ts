import { Request, Response, Router } from "express";
import prisma from "../db";
import { CREATE, ID, NAME, UPDATE } from "../constant";
import { ZodError } from "zod";
import status, {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "http-status";
import { CustomRequest } from "../types/common";
import { BoardSchema } from "../types/board";
import { UserClaims } from "../types/user";

const router = Router();

//TODO: api for creating a new board
router.post(CREATE, async (req: Request, res: Response) => {
  try {
    const claims = (req as CustomRequest).claims as UserClaims;
    const boardRequest = BoardSchema.parse(req.body);
    const board = await prisma.board.create({
      data: {
        name: boardRequest.name,
        ownerId: claims.id,
        members: {
          connect: [{ id: claims.id }],
        },
      },
    });

    res.status(CREATED).json({ status: CREATED, id: board.id });
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

//TODO: api for updating the board name
router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const boardUpdateNameRequest = BoardSchema.parse(req.body);
    const board = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name: boardUpdateNameRequest.name,
      },
    });
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
