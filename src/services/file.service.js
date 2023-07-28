import knex from "../knex";
import { TABLE_UPLOADED_FILES } from "../knex/table-names";

class FileService {
  async save({ filename, originalname, extension, mimetype, size }, userId) {
    const [savedFileId] = await knex(TABLE_UPLOADED_FILES).insert({
      filename,
      originalname,
      extension,
      mime: mimetype,
      size,
      uploadedUserId: userId,
    });

    return savedFileId;
  }
}

export const fileService = new FileService();
export default fileService;
