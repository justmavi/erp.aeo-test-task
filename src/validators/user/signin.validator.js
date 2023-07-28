import validate from "../validate.js";
import { signinValidationSchema } from "./schemas";

export const validateUserSignIn = (req, res, next) =>
  validate(signinValidationSchema, req, next);
