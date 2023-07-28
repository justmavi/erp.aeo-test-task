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

  async delete(id, userId) {
    const affected = await knex(TABLE_UPLOADED_FILES)
      .delete()
      .where({ id, uploadedUserId: userId });

    return !!affected;
  }
}

export const fileService = new FileService();
export default fileService;
