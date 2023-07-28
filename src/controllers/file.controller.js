import mime from "mime-types";
import HttpStatusCode from "http-status-codes";
import fileService from "../services/file.service";

export const uploadFile = async ({ userId, file }, res, next) => {
  const ext = mime.extension(file.mimetype);

  try {
    const id = await fileService.save({ extension: ext, ...file }, userId);

    res.status(HttpStatusCode.CREATED).json({ id });
  } catch (err) {
    next(err);
  }
};
