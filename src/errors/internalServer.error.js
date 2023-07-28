import { CustomError } from "./customError.error.js";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends CustomError {
  constructor(message) {
    super({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: message || "Something went wrong",
    });
  }
}
