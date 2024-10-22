import { z } from 'zod';

export const LoginRequestSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
  // remember: z.boolean().optional(),
});

export const LoginResponseSchema = z.object({
  // type: z.literal('bearer'),
  accessToken: z.string(),
  user: z.object({
    startOfEmployment: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    departments: z.array(z.string()),
    companies: z.array(z.string()),
    teams: z.array(z.string()),
    deleted: z.boolean(),
    deletedAt: z.date().or(z.null()),
    onProbationTill: z.date().or(z.null()),
    endOfEmployment: z.date().or(z.null()),
    _id: z.string(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    shouldUpdatePassword: z.boolean(),
    roles: z.array(z.string()),
  }),
});
