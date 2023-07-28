import { CustomError } from "./customError.error.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class NotFoundError extends CustomError {
  constructor(message) {
    const status = StatusCodes.NOT_FOUND;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
