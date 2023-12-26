import { z } from "zod";

export const ListCreateSchema = z.object({
  name: z.string(),
  position: z.number(),
  boardId: z.string(),
});

export const ListNameUpdateSchema = z
  .object({
    name: z.string(),
    position: z.number(),
  })
  .partial();

export type ListCreateSchemaType = z.infer<typeof ListCreateSchema>;
export type ListNameUpdateSchemaType = z.infer<typeof ListNameUpdateSchema>;
