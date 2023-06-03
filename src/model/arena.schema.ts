import { z } from 'zod';

const arenaBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zipcode: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type ArenaBaseType = z.infer<typeof arenaBaseSchema>;

const getArenaSchema = arenaBaseSchema.pick({
  id: true,
});
export type GetArenaType = z.infer<typeof getArenaSchema>;
