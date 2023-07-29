import { promises as fs } from "fs";
import path from "path";
import knex from "../knex";
import { TABLE_UPLOADED_FILES, TABLE_USERS } from "../knex/table-names";
import mime from "mime-types";
import { UPLOAD_FILES_DESTINATION_PATH } from "../constants/file.constants";
import { v4 } from "uuid";
import { CustomError } from "../errors";
import HttpStatusCode from "http-status-codes";

class FileService {
  /**
   *  First we save the file in memory (not on disk).
   *  Next, we open the transaction and try to insert the record into the database, while not committing it
   *  If the record was inserted successfully, we save the file to disk and commit the transaction, otherwise we return an error to the client.
   *  If something goes wrong when writing a file to disk, we simply roll back the transaction changes and return the error to the client.
   */
  async save({ originalname, mimetype, size, buffer }, userId) {
    const trx = await knex.transaction();

    try {
      const extension = mime.extension(mimetype);
      if (!extension)
        throw new CustomError({
          message: "Invalid mime-type",
          status: HttpStatusCode.BAD_REQUEST,
        });

      const filename = v4();

      const [result] = await trx
        .insert({
          filename,
          originalname,
          extension,
          mime: mimetype,
          size,
          uploadedUserId: userId,
        })
        .into(TABLE_UPLOADED_FILES);

      const filePath = path.resolve(UPLOAD_FILES_DESTINATION_PATH, filename);

      await fs.writeFile(filePath, buffer);
      await trx.commit();

      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  /*
   * We do the same as when saving, just update here instead of inserting
   */
  async update(fileId, { originalname, mimetype, size, buffer }, userId) {
    const trx = await knex.transaction();

    try {
      const extension = mime.extension(mimetype);
      if (!extension)
        throw new CustomError({
          message: "Invalid mime-type",
          status: HttpStatusCode.BAD_REQUEST,
        });

      const filename = v4();

      const affected = await knex(TABLE_UPLOADED_FILES)
        .transacting(trx)
        .update({
          filename,
          originalname,
          extension,
          mime: mimetype,
          size,
          updated_at: new Date(),
        })
        .where({ id: fileId, uploadedUserId: userId });

      if (affected) {
        const filePath = path.resolve(UPLOAD_FILES_DESTINATION_PATH, filename);

        await fs.writeFile(filePath, buffer);
        await trx.commit();
      } else {
        await trx.rollback();
      }

      return !!affected;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
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
