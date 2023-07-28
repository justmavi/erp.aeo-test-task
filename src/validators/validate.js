import { BadRequestError } from "../errors";

const validationDefaultOptions = {
  abortEarly: true,
};

const sanitize = (req, validatedData) => {
  for (let key of Object.keys(validatedData)) {
    req[key] = validatedData[key];
  }
};

export const validate = (
  schema,
  req,
  next,
  validationOptions = validationDefaultOptions
) => {
  const { error, value } = schema.validate(req, validationOptions);

  if (error) {
    const message = Array.isArray(error.details)
      ? error.details[0].message
      : undefined;
    return next(new BadRequestError(message));
  }

  sanitize(req, value);

  return next();
};

export default validate;
