import { z } from 'zod';

const weightCategoryEnumSchema = z.enum([
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
]);

const monsterTypeEnumSchema = z.enum([
  "ELEMENTARY",
  "FANTASTIC",
  "MYTHOLOGICAL",
  "SCARY",
  "AQUATIC",
  "WINGED",
  "PREHISTORIC",
  "MECHANICAL",
  "EXTRATERRESTRIAL",
  "MAGICAL",
]);

export const monsterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  weight: z.number(),
  weight_category: weightCategoryEnumSchema,
  monster_type: monsterTypeEnumSchema,
  User: z.object({}),
  fk_user: z.number().int(),
  Fighter: z.array(z.number().int()),
  picture: z.string().optional(),
});

export const createMonsterSchema = monsterSchema.pick({
  name: true,
  weight: true,
  fk_user: true,
  weight_category: true,
  monster_type: true,
  picture: true,
});

const getMonsterSchema = monsterSchema.pick({
  id: true,
});

const updateMonsterSchema = monsterSchema.pick({
  id: true,
  name: true,
  weight: true,
  weight_category: true,
  monster_type: true,
  picture: true,
});

export type CreateMonsterType = z.infer<typeof createMonsterSchema>;

export type MonsterDto = z.infer<typeof monsterSchema>;
