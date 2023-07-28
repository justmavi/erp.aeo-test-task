import Joi from "joi";

export const updateJwtTokenValidationSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required().min(1),
  }),
}).unknown(true);
