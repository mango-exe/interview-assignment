import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string().min(1, 'Name is required'),
  hashedPassword: z.string(),
});

export const CreateUser = z.object({
  email: z.email(),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const NewUser = z.object({
  email: z.email(),
  name: z.string().min(1, 'Name is required'),
  hashedPassword: z.string(),
});

export const LoginUser = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type UserSchemaDTO = z.infer<typeof UserSchema>;
export type CreateUserDTO = z.infer<typeof CreateUser>;
export type NewUserDTO = z.infer<typeof NewUser>;
export type UserResponseDTO = Omit<UserSchemaDTO, 'hashedPassword'>;
export type LoginUserDTO = z.infer<typeof LoginUser>;
