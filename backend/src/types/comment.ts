import { z } from "zod";

export const CommentCreateSchema = z.object({
  comment: z.string(),
  cardId: z.string(),
});

export type CommentCreateSchemaType = z.infer<typeof CommentCreateSchema>;
