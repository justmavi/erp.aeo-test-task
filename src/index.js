import path from "path";
import express from "express";
import { userRouter } from "./routes";

const app = express();

app.use("/user", userRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log("App is ready. Listening port", process.env.HTTP_PORT);
});
