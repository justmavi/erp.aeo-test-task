import Joi from "joi";
import { USER_PASSWORD_MIN_LENGTH } from "../../../constants";

export const signinValidationSchema = Joi.object({
  body: Joi.object({
    username: Joi.alternatives().try(
      Joi.string().email({ tlds: { allow: false } }),
      Joi.string().pattern(/^\+?\d{8,15}$/)
    ),
    password: Joi.string().min(USER_PASSWORD_MIN_LENGTH),
  }),
}).unknown(true);
