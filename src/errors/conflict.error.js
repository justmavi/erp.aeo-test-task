const CustomError = require("./customError.error");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

export class Conflict extends CustomError {
  constructor(message) {
    const status = StatusCodes.CONFLICT;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}