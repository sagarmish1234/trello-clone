import { z } from "zod";

export const ChecklistItemSchema = z.object({
  name: z.string(),
  cardId: z.string(),
  postition: z.number(),
});

export type ChecklistItemSchemaType = z.infer<typeof ChecklistItemSchema>;
