import { Request, Response, Router } from "express";
import { ADD, CREATE, GET, ID, MEMBER, REMOVE, UPDATE } from "../constant";
import { ZodError } from "zod";
import status, {
  BAD_REQUEST,
  CREATED,
  OK,
  INTERNAL_SERVER_ERROR,
} from "http-status";
import {
  CardCreateSchema,
  CardMemberUpdateSchema,
  CardUpdateSchema,
} from "../types/card";
import prisma from "../db";

const router = Router();

router.post(CREATE, async (req: Request, res: Response) => {
  try {
    const cardRequest = CardCreateSchema.parse(req.body);
    const card = await prisma.card.create({
      data: {
        ...cardRequest,
      },
    });
    res
      .status(CREATED)
      .json({ status: CREATED, message: status[CREATED], card });
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

//TODO: api for getting the card details
router.get(ID + GET, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        members: {
          select: {
            email: true,
            id: true,
          },
        },
        comment: {
          select: {
            id: true,
            comment: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            createDate: true,
          },
        },
        ChecklistItem: true,
      },
    });
    res.status(OK).json({ status: OK, message: status[OK], card });
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

//TODO: api for updating the card fields other than comment, members, checklistItem
router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cardUpdateRequest = CardUpdateSchema.parse(req.body);
    const card = await prisma.card.update({
      where: {
        id,
      },
      data: {
        ...cardUpdateRequest,
      },
    });
    res.status(OK).json({ status: OK, message: status[OK], card });
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

//TODO: api for adding card member
router.put(ID + ADD + MEMBER, async (req: Request, res: Response) => {
  try {
    const member = CardMemberUpdateSchema.parse(req.body).member;
    const id = req.params.id;
    const card = await prisma.card.update({
      where: {
        id,
      },
      data: {
        members: {
          connect: [{ id: member }],
        },
      },
    });
    res.status(OK).json({ stutus: OK, message: status[OK], card });
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

//TODO: api for removing the member from card
router.put(ID + REMOVE + MEMBER, async (req: Request, res: Response) => {
  try {
    const member = CardMemberUpdateSchema.parse(req.body).member;
    const id = req.params.id;
    const card = await prisma.card.update({
      where: {
        id,
      },
      data: {
        members: {
          disconnect: [{ id: member }],
        },
      },
    });
    res.status(OK).json({ stutus: OK, message: status[OK], card });
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
