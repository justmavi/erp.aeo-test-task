const CustomError = require("./customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

export class NotFoundError extends CustomError {
  constructor(message) {
    const status = StatusCodes.NOT_FOUND;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
