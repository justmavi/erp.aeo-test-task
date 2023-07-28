import { TABLE_UPLOADED_FILES, TABLE_USERS } from "../table-names";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_UPLOADED_FILES, (table) => {
    table.increments("id");
    table.string("filename").notNullable();
    table.string("originalname").notNullable();
    table.string("extension").notNullable();
    table.string("mime").notNullable();
    table.integer("size").nullable();
    table
      .integer("uploadedUserId")
      .unsigned()
      .references("id")
      .inTable(TABLE_USERS)
      .nullable();
    table.timestamps();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_UPLOADED_FILES);
}
