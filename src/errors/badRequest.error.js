import { CustomError } from "./customError.error.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class BadRequestError extends CustomError {
  constructor(message) {
    const status = StatusCodes.BAD_REQUEST;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
