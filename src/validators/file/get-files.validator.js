import validate from "../validate.js";
import { getFilesValidationSchema } from "./schemas/index.js";

export const validateGetFiles = (req, res, next) =>
  validate(getFilesValidationSchema, req, next);
