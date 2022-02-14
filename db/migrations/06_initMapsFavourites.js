/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('maps_favourites', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .integer('map_id')
      .references('id').inTable('maps')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .references('id').inTable('users')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('maps_favourites');
};
