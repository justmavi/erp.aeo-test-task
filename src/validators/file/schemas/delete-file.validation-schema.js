import Joi from "joi";

export const deleteFileValidationSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required().min(1),
  }),
}).unknown(true);
