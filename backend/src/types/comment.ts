import { z } from "zod";

export const CommentCreateSchema = z.object({
  comment: z.string(),
  cardId: z.string(),
});

export const CommentUpdateSchema = z.object({
  comment: z.string(),
});

export type CommentCreateSchemaType = z.infer<typeof CommentCreateSchema>;
export type CommentUpdateSchemaType = z.infer<typeof CommentUpdateSchema>;
