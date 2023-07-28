import { CustomError } from "./customError.error.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ValidationError extends CustomError {
  constructor(message) {
    const status = StatusCodes.UNPROCESSABLE_ENTITY;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
