import Joi from "joi";

export const getFilesValidationSchema = Joi.object({
  query: Joi.object({
    listSize: Joi.number().optional().min(1),
    page: Joi.number().optional().min(1),
  }),
}).unknown(true);
