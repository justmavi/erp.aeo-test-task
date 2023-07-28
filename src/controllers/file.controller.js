import mime from "mime-types";
import HttpStatusCode from "http-status-codes";
import fileService from "../services/file.service";
import { BadRequestError } from "../errors";

export const uploadFile = async ({ userId, file }, res, next) => {
  const ext = mime.extension(file.mimetype);

  try {
    const id = await fileService.save({ extension: ext, ...file }, userId);

    res.status(HttpStatusCode.CREATED).json({ id });
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const { id } = req.params;

  const success = await fileService.delete(id, req.userId);
  if (!success) return next(new BadRequestError("File not found"));

  res.status(HttpStatusCode.OK).json({ ok: true });
};
