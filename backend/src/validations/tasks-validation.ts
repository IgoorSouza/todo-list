import z from "zod";

export const createValidation = z.object({
  title: z.string(),
  description: z.string(),
});

export const updateValidation = z.object({
  id: z.number(),
  done: z.boolean(),
});

export const removeValidation = z.object({
  id: z.number(),
});
