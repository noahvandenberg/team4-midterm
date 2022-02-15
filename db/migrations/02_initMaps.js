/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('maps', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .integer('creator_id')
      .references('id').inTable('users')
      .onDelete('CASCADE');
    table
      .timestamp('time_created').defaultTo(knex.fn.now());
    table
      .string('title');
    table
      .string('description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('maps');
};
