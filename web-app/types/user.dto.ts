import { z } from 'zod';

export const CreateUserDTO = z.object({
  walletAddress: z.string().startsWith('0x').length(42),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const UpdateUserDTO = CreateUserDTO.partial();

export type CreateUserInput = z.infer<typeof CreateUserDTO>;

export type UpdateUserInput = z.infer<typeof UpdateUserDTO>;
