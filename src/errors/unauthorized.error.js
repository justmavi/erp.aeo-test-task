import { CustomError } from "./customError.error.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class UnauthorizedError extends CustomError {
  constructor(message) {
    const status = StatusCodes.UNAUTHORIZED;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
