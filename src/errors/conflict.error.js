import { CustomError } from "./customError.error.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ConflictError extends CustomError {
  constructor(message) {
    const status = StatusCodes.CONFLICT;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
