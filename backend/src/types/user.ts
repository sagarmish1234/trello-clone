import { z } from "zod";

export const UserCreateSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const UserLoginRequest = z.object({
  email: z.string(),
  password: z.string(),
});

export const UserClaimsSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>;
export type UserLoginRequestType = z.infer<typeof UserLoginRequest>;
export type UserClaims = z.infer<typeof UserClaimsSchema>;
