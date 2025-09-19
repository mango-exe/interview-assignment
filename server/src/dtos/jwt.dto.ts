import { z } from 'zod';

export const JwtSchema = z.object({
  userId: z.number(),
  email: z.string().email(),
});

export type JWTDto = z.infer<typeof JwtSchema>;
