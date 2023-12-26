import { Request, Response, Router } from "express";
import { CREATE, ID, UPDATE } from "../constant";
import status, {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "http-status";
import { ListCreateSchema, ListNameUpdateSchema } from "../types/list";
import prisma from "../db";
import { ZodError } from "zod";

const router = Router();

router.post(CREATE, async (req: Request, res: Response) => {
  try {
    const listRequest = ListCreateSchema.parse(req.body);
    const list = await prisma.list.create({
      data: {
        name: listRequest.name,
        position: listRequest.position,
        boardId: listRequest.boardId,
      },
    });

    console.log(list);
    res.status(CREATED).json({ status: OK, message: status[OK], list });
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

//TODO: api for updating the list - name, position
router.put(ID + UPDATE, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const listUpdateRequest = ListNameUpdateSchema.parse(req.body);
    const list = await prisma.list.update({
      where: {
        id,
      },
      data: {
        ...listUpdateRequest,
      },
    });
    res
      .status(OK)
      .json({ status: OK, message: "List name updated successfully", list });
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
