import Multer from "multer";
import path from "path";
import { v4 } from "uuid";
import {
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_FILES_DESTINATION_PATH,
} from "../constants/file-upload.constants";

const __dirname = path.resolve(path.dirname(""));

const storage = (dest) =>
  Multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, v4());
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, dest));
    },
  });

export const multer = () =>
  Multer({
    storage: storage(UPLOAD_FILES_DESTINATION_PATH),
    limits: { fileSize: MAX_UPLOAD_FILE_SIZE },
  });
