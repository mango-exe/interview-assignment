import { z } from 'zod';

export const ResponseSchema = z.object({
  timestamp: z.string(),
  data: z.any(),
  message: z.string(),
});

export type ResponseDTO = z.infer<typeof ResponseSchema>;
