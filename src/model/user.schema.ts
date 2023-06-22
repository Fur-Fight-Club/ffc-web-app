import { z } from 'zod';

export const roleEnum = z.enum(['USER', 'ADMIN']);
export type RoleType = z.infer<typeof roleEnum>;

const userBaseSchema = z.object({
  id: z.number().optional(),
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
  confirmPassword: z.string().optional(),
  role: roleEnum.optional(),
});

export type User = z.infer<typeof userBaseSchema>;

export const loginSchema = userBaseSchema.pick({ email: true, password: true });
export type LoginType = z.infer<typeof loginSchema>;

export const editUserSchema = userBaseSchema.omit({ password: true });
export type EditUserType = z.infer<typeof editUserSchema>;

export const registerSchema = userBaseSchema
  .pick({
    firstname: true,
    lastname: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export type RegisterType = z.infer<typeof registerSchema>;

export const resetPasswordSchema = userBaseSchema.pick({ email: true });
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

const getMonstersOfUserSchema = userBaseSchema.pick({
  id: true,
});
export type GetMonstersOfUserType = z.infer<typeof getMonstersOfUserSchema>;
