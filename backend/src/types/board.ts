import { z } from "zod";

export const BoardCreateSchema = z.object({
  name: z.string(),
});

export type BoardCreateSchemaType = z.infer<typeof BoardCreateSchema>;
