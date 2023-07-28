const CustomError = require("./customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

export class ValidationError extends CustomError {
  constructor(message) {
    const status = StatusCodes.UNPROCESSABLE_ENTITY;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
