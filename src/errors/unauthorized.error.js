const CustomError = require("./customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

export class Unauthorized extends CustomError {
  constructor(message) {
    const status = StatusCodes.UNAUTHORIZED;

    super({
      status,
      message: message || getReasonPhrase(status),
    });
  }
}
