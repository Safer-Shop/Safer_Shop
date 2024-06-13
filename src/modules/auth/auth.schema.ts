import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const RegisterSchema = Joi.object({
  name: Joi.string().min(1).required(),
  surname: Joi.string().min(1).optional(),
  username: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
  email: Joi.string().min(1).email().required(),
  address: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const VerifySchema = Joi.object({
  code: Joi.string().min(1).required(),
  verificationId: Joi.string().min(0),
});

export const ResendSchema = Joi.object({
  email: Joi.string().email().required()
})