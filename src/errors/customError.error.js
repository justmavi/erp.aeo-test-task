export class CustomError extends Error {
  constructor(params) {
    const { message, status } = params;

    super();

    this.message = message;
    this.status = status;
  }
}
