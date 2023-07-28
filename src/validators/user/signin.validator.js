import Joi from "joi";
import { USER_PASSWORD_MIN_LENGTH } from "../../constants";

export const signinValidationSchema = Joi.object({
  username: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(USER_PASSWORD_MIN_LENGTH),
});
