import Joi from "joi";

export const getFileValidationSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required().min(1),
  }),
}).unknown(true);
