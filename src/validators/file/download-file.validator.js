import validate from "../validate.js";
import { downloadFileValidationSchema } from "./schemas/index.js";

export const validateDownloadFile = (req, res, next) =>
  validate(downloadFileValidationSchema, req, next);
