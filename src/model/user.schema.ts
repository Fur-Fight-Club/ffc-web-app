import { z } from 'zod';

export const roleEnum = z.enum(['USER', 'ADMIN']);

const userSchema = z.object({
  id: z.number(),
  firstname: z
    .string()
    .min(2, { message: 'Firstname must be at least 2 characters long' })
    .max(255),
  lastname: z
    .string()
    .min(2, { message: 'Lastname must be at least 2 characters long' })
    .max(255),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase character',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase character',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one digit',
    })
    .refine((password) => /[^a-zA-Z0-9]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
  role: roleEnum,
});

export const loginSchema = userSchema.pick({ email: true, password: true });
export const editUserSchema = userSchema.omit({ password: true });

export type RoleType = z.infer<typeof roleEnum>;
export type UserType = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type EditUserType = z.infer<typeof editUserSchema>;
