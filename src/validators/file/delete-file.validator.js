import validate from "../validate.js";
import { deleteFileValidationSchema } from "./schemas";

export const validateDeleteFile = (req, res, next) =>
  validate(deleteFileValidationSchema, req, next);
