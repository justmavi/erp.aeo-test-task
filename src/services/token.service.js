import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import {
  JWT_LIFETIME_IN_SECONDS,
  REFRESH_TOKEN_LIFETIME_IN_DAYS,
} from "../constants";
import knex from "../knex";
import { TABLE_REFRESH_TOKENS } from "../knex/table-names";
import redisService from "../redis";

class TokenService {
  generateJwt(forUserId) {
    return jwt.sign({ sub: forUserId }, process.env.JWT_SECRET, {
      expiresIn: JWT_LIFETIME_IN_SECONDS,
    });
  }

  async generateRefresh(forUserId) {
    const activeRefreshToken = await this.getUserActiveRefreshToken(forUserId);
    if (activeRefreshToken) {
      console.log(activeRefreshToken);
      return activeRefreshToken.token;
    }

    const token = v4();
    const date = new Date();
    date.setDate(date.getDate() + REFRESH_TOKEN_LIFETIME_IN_DAYS);

    await knex(TABLE_REFRESH_TOKENS).insert({
      token,
      userId: forUserId,
      expiresIn: date,
    });

    return token;
  }

  async getUserActiveRefreshToken(userId) {
    const data = await knex(TABLE_REFRESH_TOKENS)
      .where({ userId })
      .andWhere("expiresIn", ">=", new Date())
      .first();

    return data;
  }

  parseJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async getRefreshTokenOwner(token) {
    const data = await knex(TABLE_REFRESH_TOKENS)
      .where({ token })
      .andWhere("expiresIn", ">=", new Date())
      .first();

    return data?.userId;
  }

  async invalidateToken(token) {
    const decodedToken = jwt.decode(token);
    const timeLeft = decodedToken.exp - Math.floor(Date.now() / 1000);
    await redisService.set(token, true, "EX", timeLeft);
  }
}

export const tokenService = new TokenService();
export default tokenService;
