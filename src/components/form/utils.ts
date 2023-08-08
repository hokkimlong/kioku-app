import z from 'zod';

export const makeStringRequired = (zod: z.ZodString) => zod.trim().min(1);

export const emailRequired = makeStringRequired(z.string().email());
export const stringRequired = makeStringRequired(z.string());
