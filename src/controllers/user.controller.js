import HttpStatusCodes from "http-status-codes";
import { NotFoundError } from "../errors/notFound.error";
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
  const refreshToken = tokenService.generateRefresh();

  return res.status(HttpStatusCodes.OK).json({ jwtToken, refreshToken });
};
