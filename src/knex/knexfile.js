import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: +process.env.DB_CONN_POLL_MIN,
    max: +process.env.DB_CONN_POLL_MAX,
  },
  propagateCreateError: false,
  acquireConnectionTimeout: process.env.DB_CONN_TIMEOUT,
  migrations: {
    directory: `./migrations`,
  },
};
