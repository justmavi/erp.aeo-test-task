import validate from "../validate.js";
import { signupValidationSchema } from "./schemas";

export const validateUserSignUp = (req, res, next) =>
  validate(signupValidationSchema, req, next);
