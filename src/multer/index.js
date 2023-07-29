import Multer from "multer";
import { MAX_UPLOAD_FILE_SIZE } from "../constants/file.constants";

export const uploadFile = (fieldName = "file") =>
  Multer({
    storage: Multer.memoryStorage({}),
    limits: { fileSize: MAX_UPLOAD_FILE_SIZE },
  }).single(fieldName);
