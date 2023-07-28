import { TABLE_REFRESH_TOKENS, TABLE_USERS } from "../table-names.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_REFRESH_TOKENS, (table) => {
    table.increments("id");
    table.string("token").unique().notNullable();
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable(TABLE_USERS)
      .notNullable();
    table.timestamps(true);
    table.timestamp("expiresIn").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_REFRESH_TOKENS);
}
