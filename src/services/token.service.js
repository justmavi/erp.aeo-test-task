import jwt from "jsonwebtoken";
import { JWT_LIFETIME_IN_SECONDS } from "../constants";

class TokenService {
  generateJwt(forUserId) {
    return jwt.sign({ sub: forUserId }, process.env.JWT_SECRET, {
      expiresIn: JWT_LIFETIME_IN_SECONDS,
    });
  }

  generateRefresh(forUserId) {}

  parseJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export const tokenService = new TokenService();
export default tokenService;
