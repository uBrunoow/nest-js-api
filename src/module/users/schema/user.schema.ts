import { z } from 'zod';

export const UsersSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string(),
});

export const UsersUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  avatarUrl: z.string().optional(),
});
