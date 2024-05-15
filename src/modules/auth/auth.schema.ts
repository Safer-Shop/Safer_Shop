import Joi from "joi";

export const LoginSchema = Joi.object({
  username: Joi.string().min(1).required(),
  email: Joi.string().min(1).optional(),
  password: Joi.string().min(1).required(),
});
