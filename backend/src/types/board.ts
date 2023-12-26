import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string(),
});

export const BoardMemberUpdateSchema = z.object({
  member: z.string(),
});

export type BoardCreateSchemaType = z.infer<typeof BoardSchema>;
export type BoardMemberUpdateSchemaType = z.infer<
  typeof BoardMemberUpdateSchema
>;
