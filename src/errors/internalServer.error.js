const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");

export class InternalServer extends CustomError {
  constructor(message) {
    super({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: message || "Something went wrong",
    });
  }
}
