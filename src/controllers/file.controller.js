import mime from "mime-types";
import HttpStatusCode from "http-status-codes";
import fileService from "../services/file.service";
import { BadRequestError } from "../errors";
import {
  FILE_LIST_DEFAULT_PAGE_NUMBER,
  FILE_LIST_DEFAULT_SIZE,
} from "../constants/file.constants";

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

export const getFiles = async (req, res, next) => {
  const {
    listSize = FILE_LIST_DEFAULT_SIZE,
    page = FILE_LIST_DEFAULT_PAGE_NUMBER,
  } = req.query;

  const data = await fileService.getAll(listSize, (page - 1) * listSize);
  const mappedData = data.map((x) => ({
    id: x.fileId,
    name: x.originalname,
    uploadDate: x.updated_at,
    user: {
      id: x.uploadedUserId,
      username: x.username,
    },
  }));

  res.status(HttpStatusCode.OK).json(mappedData);
};
