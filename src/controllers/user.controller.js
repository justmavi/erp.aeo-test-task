import HttpStatusCodes from "http-status-codes";
import { UnauthorizedError } from "../errors/unauthorized.error";
import tokenService from "../services/token.service";
import passwordService from "../services/password.service";
import userService from "../services/user.service";
import { UniqueViolationError, wrapError } from "db-errors";
import { ConflictError, InternalServerError, NotFoundError } from "../errors";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.getByUsername(username);
    if (!user)
      return next(new UnauthorizedError("Incorrect login or password"));

    const matches = await passwordService.checkMatching(
      user.password,
      password
    );
    if (!matches)
      return next(new UnauthorizedError("Incorrect login or password"));

    const jwtToken = tokenService.generateJwt(user.id);
    const refreshToken = await tokenService.generateRefresh(user.id);

    res.status(HttpStatusCodes.OK).json({ jwtToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  const model = req.body;

  try {
    const createdUserId = await userService.create(model);

    const jwtToken = tokenService.generateJwt(createdUserId);
    const refreshToken = await tokenService.generateRefresh(createdUserId);

    const responseObject = {
      user: { id: createdUserId, username: model.username },
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
  try {
    const { id, username } = await userService.getById(userId);
    res.status(HttpStatusCodes.OK).json({ id, username });
  } catch (err) {
    next(err);
  }
};

export const updateJwtToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const userId = await tokenService.getRefreshTokenOwner(refreshToken);

    if (!userId)
      return next(new NotFoundError("Refresh token not found or expired"));

    const newJwt = tokenService.generateJwt(userId);

    res.status(HttpStatusCodes.OK).json({ newJwt });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    await Promise.all([
      tokenService.invalidateJwtToken(token),
      tokenService.invalidateUserRefreshToken(req.userId),
    ]);

    res.status(HttpStatusCodes.OK).json({ ok: true });
  } catch (err) {
    next(err);
  }
};
