import { Request, Response, Router } from "express";
import { CREATE, ID, UPDATE } from "../constant";
import { ZodError } from "zod";
import status, {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "http-status";
import {
  ChecklistItemCreateSchema,
  ChecklistItemUpdateSchema,
} from "../types/checklistItem";
import prisma from "../db";

const router = Router();

//TODO: api for creating a checklist item

router.post(CREATE, async (req: Request, res: Response) => {
  try {
    const itemRequest = ChecklistItemCreateSchema.parse(req.body);
    const item = await prisma.checklistItem.create({
      data: {
        ...itemRequest,
      },
    });
    res
      .status(CREATED)
      .json({ status: CREATED, message: status[CREATED], checklistItem: item });
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

//TODO: api for updating the checklist item

router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const itemUpdateRequest = ChecklistItemUpdateSchema.parse(req.body);
    const item = await prisma.checklistItem.update({
      where: {
        id,
      },
      data: {
        ...itemUpdateRequest,
      },
    });

    res
      .status(OK)
      .json({ status: OK, message: status[OK], checkListItem: item });
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
