import fs from "fs";
import { mkdirp } from "mkdirp";
import express from "express";
import { fileRouter, userRouter } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import { BadRequestError, CustomError, InternalServerError } from "./errors";
import HttpStatusCode from "http-status-codes";
import {
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_FILES_DESTINATION_PATH,
} from "./constants/file.constants";
import multer from "multer";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/file", fileRouter);

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json(err);
  } else if (err instanceof multer.MulterError) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(
        new BadRequestError(
          `File too large. Max: ${MAX_UPLOAD_FILE_SIZE / 1048576}MB`
        )
      );
  } else {
    console.log("An unhandled exception occured while handling request", err);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(new InternalServerError());
  }
});

app.listen(process.env.HTTP_PORT, () => {
  console.log("App is ready. Listening port", process.env.HTTP_PORT);
});

if (!fs.existsSync(UPLOAD_FILES_DESTINATION_PATH)) {
  mkdirp(UPLOAD_FILES_DESTINATION_PATH)
    .then(() => console.log("Automatically created folder for uploaded files"))
    .catch((err) =>
      console.log("Cannot automatically create folder for uploaded files", err)
    );
}
