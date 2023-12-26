import { z } from "zod";

export const ChecklistItemCreateSchema = z.object({
  name: z.string(),
  cardId: z.string(),
  position: z.number(),
});

export const ChecklistItemUpdateSchema = z
  .object({
    name: z.string(),
    position: z.number(),
    isChecked: z.boolean(),
  })
  .partial();

export type ChecklistItemCreateSchemaType = z.infer<
  typeof ChecklistItemCreateSchema
>;
export type ChecklistItemUpdateSchemaType = z.infer<
  typeof ChecklistItemUpdateSchema
>;
