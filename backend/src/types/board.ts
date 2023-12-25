import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string(),
});

export type BoardCreateSchemaType = z.infer<typeof BoardSchema>;
