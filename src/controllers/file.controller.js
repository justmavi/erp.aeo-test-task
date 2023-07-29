import fs from "fs";
import HttpStatusCode from "http-status-codes";
import path from "path";
import {
  FILE_LIST_DEFAULT_PAGE_NUMBER,
  FILE_LIST_DEFAULT_SIZE,
  UPLOAD_FILES_DESTINATION_PATH,
} from "../constants/file.constants";
import { BadRequestError, NotFoundError } from "../errors";
import fileService from "../services/file.service";

export const uploadFile = async (req, res, next) => {
  const { userId, file } = req;

  try {
    const id = await fileService.save(file, userId);
    res.status(HttpStatusCode.CREATED).json({ id });
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const success = await fileService.delete(id, req.userId);
    if (!success) return next(new BadRequestError("File not found"));

    res.status(HttpStatusCode.OK).json({ ok: true });
  } catch (err) {
    next(err);
  }
};

export const getFiles = async (req, res, next) => {
  const {
    listSize = FILE_LIST_DEFAULT_SIZE,
    page = FILE_LIST_DEFAULT_PAGE_NUMBER,
  } = req.query;

  try {
    const data = await fileService.getAll(listSize, (page - 1) * listSize);
    const mappedData = data.map((x) => ({
      id: x.fileId,
      name: x.originalname,
      uploadDate: x.updated_at,
      size: x.size,
      user: {
        id: x.uploadedUserId,
        username: x.username,
      },
    }));

    res.status(HttpStatusCode.OK).json(mappedData);
  } catch (err) {
    next(err);
  }
};

export const getFileById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fileService.getById(id);
    if (!data) return next(new NotFoundError("File not found"));

    const mappedData = {
      id: data.fileId,
      name: data.originalname,
      uploadDate: data.updated_at,
      size: data.size,
      user: {
        id: data.uploadedUserId,
        username: data.username,
      },
    };

    res.status(HttpStatusCode.OK).json(mappedData);
  } catch (err) {
    next(err);
  }
};

export const downloadFile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await fileService.getById(id);
    if (!data) return next(new NotFoundError("File not found"));

    const filePath = path.resolve(UPLOAD_FILES_DESTINATION_PATH, data.filename);
    if (!fs.existsSync(filePath))
      return next(new NotFoundError("File not found"));

    res.download(filePath, data.originalname);
  } catch (err) {
    next(err);
  }
};

export const updateFile = async (req, res, next) => {
  const { id } = req.params;
  const { file, userId } = req;

  try {
    const success = await fileService.update(id, file, userId);
    if (!success) return next(new BadRequestError("File not found"));

    res.status(HttpStatusCode.OK).json({ ok: true });
  } catch (err) {
    next(err);
  }
};
