import { z } from "zod";

export const arenaSchema = z.object({
  id: z.number().int(),
  name: z
    .string()
    .min(2, { message: "Le nom dois au moins faire 2 caractères" }),
  address: z.string().min(5, { message: "L'adresse dois etre valide" }),
  address2: z.string(),
  city: z.string(),
  zipcode: z
    .string()
    .regex(/^\d{5}$/, { message: "Le code postal doit être valide" }),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  match: z.array(z.object({})),
});
export type ArenaType = z.infer<typeof arenaSchema>;

export const createArenaSchema = arenaSchema.pick({
  name: true,
  address: true,
  city: true,
  zipcode: true,
  country: true,
});
export type CreateArenaType = z.infer<typeof createArenaSchema>;
