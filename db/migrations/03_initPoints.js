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
      .integer('map_id')
      .references('id').inTable('maps')
      .onDelete('CASCADE');
    table
      .timestamp('time_created').defaultTo(knex.fn.now());
    table
      .string('title');
    table
      .string('description');
    table
      .float('latitude', 14, 10);
    table
      .float('longitude', 14, 10);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('points');
};
