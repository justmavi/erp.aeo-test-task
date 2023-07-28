import validate from "../validate.js";
import { getFileValidationSchema } from "./schemas/index.js";

export const validateGetFile = (req, res, next) =>
  validate(getFileValidationSchema, req, next);
