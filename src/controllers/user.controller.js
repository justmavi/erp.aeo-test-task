import HttpStatusCodes from "http-status-codes";
import { UnauthorizedError } from "../errors/unauthorized.error";
import tokenService from "../services/token.service";
import passwordService from "../services/password.service";
import userService from "../services/user.service";
import { UniqueViolationError, wrapError } from "db-errors";
import { ConflictError, InternalServerError } from "../errors";

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await userService.getByUsername(username);
  if (!user) return next(new UnauthorizedError("Incorrect login or password"));

  const matches = passwordService.checkMatching(user.password, password);
  if (!matches)
    return next(new UnauthorizedError("Incorrect login or password"));

  const jwtToken = tokenService.generateJwt(user.id);
  const refreshToken = tokenService.generateRefresh(user.id);

  res.status(HttpStatusCodes.OK).json({ jwtToken, refreshToken });
};

export const register = async (req, res, next) => {
  const model = req.body;

  try {
    const createdUserId = await userService.create(model);

    const jwtToken = tokenService.generateJwt(createdUserId);
    const refreshToken = tokenService.generateRefresh(createdUserId);

    const responseObject = {
      user: { id: createdUserId, ...model },
      tokens: {
        jwt: jwtToken,
        refresh: refreshToken,
      },
    };

    res.status(HttpStatusCodes.CREATED).json(responseObject);
  } catch (err) {
    err = wrapError(err);
    if (err instanceof UniqueViolationError)
      next(new ConflictError("User already exists"));
    else next(new InternalServerError());
  }
};

export const getUserInfo = async ({ userId }, res) => {
  const user = await userService.getById(userId);

  res.status(HttpStatusCodes.OK).json(user);
};
