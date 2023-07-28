import Joi from "joi";

export const downloadFileValidationSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required().min(1),
  }),
}).unknown(true);
