/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('points', table => {
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
    table
      .string('image_url');
    table
      .integer('latitude');
    table
      .integer('longitude');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
