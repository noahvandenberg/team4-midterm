/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('maps_points', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .integer('map_id')
      .references('id').inTable('maps')
      .onDelete('CASCADE');
    table
      .integer('point_id')
      .references('id').inTable('points')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
