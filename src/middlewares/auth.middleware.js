import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";
import redisService from "../redis";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(new UnauthorizedError());

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return next(new UnauthorizedError("Invalid token"));
    }

    const exists = await redisService.exists(token);
    if (exists) return next(new UnauthorizedError());

    req.userId = payload.sub;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError("Token expired"));
    } else {
      next(err);
    }
  }
};
