import { z } from "zod";

export const ListCreateSchema = z.object({
  name: z.string(),
  position: z.number(),
  boardId: z.string(),
});

export type ListCreateSchemaType = z.infer<typeof ListCreateSchema>;
