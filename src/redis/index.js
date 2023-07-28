import Redis from "ioredis";
import config from "./config.js";

class RedisService extends Redis {
  constructor(...args) {
    super(...args);

    this.select(config.db, (err) => {
      if (err) {
        console.error("[Redis] Error during switching DB");
      }
    });
  }
}

export const redisService = new RedisService(config);
export default redisService;
