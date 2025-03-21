import z from "zod";

export const createValidation = z.object({
  title: z.string(),
  description: z.string(),
});

export const concludeValidation = z.object({
  done: z.boolean(),
});
