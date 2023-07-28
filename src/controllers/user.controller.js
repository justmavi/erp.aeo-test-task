import HttpStatusCodes from "http-status-codes";
import { UnauthorizedError } from "../errors/unauthorized.error";
import tokenService from "../services/token.service";
import passwordService from "../services/password.service";
import userService from "../services/user.service";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userService.getByUsername(username);
  if (!user) throw new UnauthorizedError("Incorrect login or password");

  const matches = passwordService.checkMatching(user.password, password);
  if (!matches) throw new UnauthorizedError("Incorrect login or password");

  const jwtToken = tokenService.generateJwt(user.id);
  const refreshToken = tokenService.generateRefresh(user.id);

  return res.status(HttpStatusCodes.OK).json({ jwtToken, refreshToken });
};

export const register = async (req, res) => {
  const model = req.body;

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

  return res.status(HttpStatusCodes.CREATED).json(responseObject);
};

export const getUserInfo = async ({ userId }, res) => {
  const user = await userService.getById(userId);

  return res.status(HttpStatusCodes.OK).json(user);
};
