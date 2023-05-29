import { z } from 'zod';

const roleEnum = z.enum(['USER', 'ADMIN']);

const userSchema = z.object({
  id: z.number(),
  firstname: z
    .string()
    .min(2, { message: 'Firstname must be at last 2 characters long' })
    .max(255),
  lastname: z
    .string()
    .min(2, { message: 'Firstname must be at last 2 characters long' })
    .max(255),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  role: roleEnum,
});

export const loginSchema = userSchema.pick({ email: true, password: true });
export const editUserSchema = userSchema.omit({ password: true });

export type RoleType = z.infer<typeof roleEnum>;
export type UserType = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type EditUserType = z.infer<typeof editUserSchema>;
