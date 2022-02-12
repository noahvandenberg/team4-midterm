/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table
      .increments('user_id')
      .unsigned()
      .primary();
    table
      .string("email")
      .unique()
      .notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
