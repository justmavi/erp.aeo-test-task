import validate from "../validate.js";
import { updateJwtTokenValidationSchema } from "./schemas/index.js";

export const validateUpdateJwtToken = (req, res, next) =>
  validate(updateJwtTokenValidationSchema, req, next);
