import yup from "yup";

export const createValidation = yup.object({
  title: yup.string().required(),
  description: yup.string(),
});

export const updateValidation = yup.object({
  id: yup.number().required(),
  title: yup.string(),
  description: yup.string(),
  done: yup.boolean(),
});

export const removeValidation = yup.object({
  id: yup.number().required(),
});
