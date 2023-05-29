import { z } from 'zod';

export const roleEnum = z.enum(['USER', 'ADMIN']);

const userSchema = z.object({
  id: z.number(),
  firstname: z
    .string()
    .min(2, { message: 'Le prénom doit comporter au moins 2 caractères' })
    .max(255)
    .regex(/^[A-Za-z]+$/, {
      message: 'Le prénom doit être composé uniquement de lettres',
    }),

  lastname: z
    .string()
    .min(2, { message: 'Le nom doit comporter au moins 2 caractères' })
    .max(255)
    .regex(/^[A-Za-z]+$/, {
      message: 'Le nom doit être composé uniquement de lettres',
    }),
  email: z.string().email({ message: 'Adresse électronique invalide' }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit comporter au moins 8 caractères',
  }),
  role: roleEnum,
});

export const loginSchema = userSchema.pick({ email: true, password: true });
export const editUserSchema = userSchema.omit({ password: true, id: true });

export type RoleType = z.infer<typeof roleEnum>;
export type UserType = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type EditUserType = z.infer<typeof editUserSchema>;
