/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table
      .string("email")
      .notNullable();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('profile_image_url').defaultTo('http://placeimg.com/640/480/people')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
