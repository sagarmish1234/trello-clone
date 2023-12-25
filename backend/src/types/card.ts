import { z } from "zod";

export const CardCreateSchema = z.object({
  name: z.string(),
  listId: z.string(),
  position: z.string(),
});

export type CardCreateSchemaType = z.infer<typeof CardCreateSchema>;
