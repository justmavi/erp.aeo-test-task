import { TABLE_USERS } from "../table-names.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_USERS, (table) => {
    table.increments("id");
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_USERS);
}
