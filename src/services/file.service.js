import knex from "../knex";
import { TABLE_UPLOADED_FILES } from "../knex/table-names";

class FileService {
  async save({ filename, originalName, extension, mime, size }, userId) {
    const savedFileId = await knex(TABLE_UPLOADED_FILES)
      .insert({
        filename,
        originalName,
        extension,
        mime,
        size,
        uploadedUserId: userId,
      })
      .first();

    return savedFileId;
  }
}

export const fileService = new FileService();
export default fileService;
