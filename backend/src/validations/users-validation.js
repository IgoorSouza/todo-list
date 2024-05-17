import yup from "yup";

export const registerValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export const loginValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});