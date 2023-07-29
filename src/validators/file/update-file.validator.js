import validate from "../validate.js";
import { updateFileValidationSchema } from "./schemas/index.js";

export const validateUpdateFile = (req, res, next) =>
  validate(updateFileValidationSchema, req, next);
