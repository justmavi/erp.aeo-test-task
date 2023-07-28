import knex from "../knex";
import { TABLE_UPLOADED_FILES, TABLE_USERS } from "../knex/table-names";

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

  #getFileSelectQueryBuilder() {
    return knex(TABLE_UPLOADED_FILES)
      .select("*", `${TABLE_UPLOADED_FILES}.id as fileId`)
      .leftJoin(TABLE_USERS, function () {
        this.on(
          `${TABLE_USERS}.id`,
          "=",
          `${TABLE_UPLOADED_FILES}.uploadedUserId`
        );
      });
  }

  // I'm not returning promise, because knex works with fake-promise and we'd have returned Query Builder object instead of Promise
  // and client could modify query before "await"
  async getAll(limit, offset) {
    const data = await this.#getFileSelectQueryBuilder()
      .limit(limit)
      .offset(offset);

    return data;
  }

  async getById(id) {
    const data = await this.#getFileSelectQueryBuilder()
      .where(`${TABLE_UPLOADED_FILES}.id`, "=", id)
      .first();

    return data;
  }
}

export const fileService = new FileService();
export default fileService;
