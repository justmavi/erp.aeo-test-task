import Joi from "joi";

export const getFilesValidationSchema = Joi.object({
  query: Joi.object({
    listSize: Joi.number().required().min(1),
    page: Joi.number().required().min(1),
  }),
}).unknown(true);
