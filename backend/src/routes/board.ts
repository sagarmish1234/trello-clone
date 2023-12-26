import { Request, Response, Router } from "express";
import prisma from "../db";
import { CREATE, GET, ID, ME, MEMBERS, UPDATE } from "../constant";
import { ZodError } from "zod";
import status, {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
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

//TODO: API for fetching the board with list and cards

router.get(ID, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const board = await prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
        lists: {
          include: {
            cards: true,
          },
        },
      },
    });
    res.status(OK).json({ status: OK, board: board });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: status[BAD_REQUEST],
      });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        message: status[INTERNAL_SERVER_ERROR],
      });
    }
  }
});

//TODO: API for fetching boards of the current logged in user
router.get(ME + GET, async (req: Request, res: Response) => {
  try {
    const ownerId = ((req as CustomRequest).claims as UserClaims).id;
    const boards = await prisma.board.findMany({
      where: {
        ownerId: ownerId,
      },
    });

    console.log(boards);
    res.status(OK).json({ status: OK, message: "Some message", boards });
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

//TODO: api for updating the board field except members,list
router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const boardId = req.params.id;
    const boardUpdateNameRequest = BoardSchema.parse(req.body);
    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name: boardUpdateNameRequest.name,
      },
    });
    res.status(OK).json({ status: OK, message: status[OK] });
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

//TODO: api for getting the board members which can later be used in cards
router.get(ID + GET + MEMBERS, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const users = await prisma.board.findUnique({
      where: {
        id,
      },
      select: {
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    res
      .status(OK)
      .json({ status: OK, message: status[OK], members: users?.members });
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
