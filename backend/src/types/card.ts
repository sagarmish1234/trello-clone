import { z } from "zod";

export const CardCreateSchema = z.object({
  name: z.string(),
  listId: z.string(),
  position: z.number(),
});

export const CardUpdateSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    createDate: z.date(),
    dueDate: z.date(),
    reminderDate: z.date(),
    position: z.number(),
    listId: z.string(),
  })
  .partial();

export const CardMemberUpdateSchema = z.object({
  member: z.string(),
});

export type CardCreateSchemaType = z.infer<typeof CardCreateSchema>;
export type CardUpdateSchemaType = z.infer<typeof CardUpdateSchema>;
export type CardMemberUpdateSchemaType = z.infer<typeof CardMemberUpdateSchema>;
