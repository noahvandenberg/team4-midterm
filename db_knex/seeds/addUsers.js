/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const { faker } = require('@faker-js/faker');

const createFakeUser = () => ({
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
});

exports.seed = async function(knex) {
  const fakeUsers = [];
  const desiredFakeUsers = 50;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex('users').del().insert(fakeUsers);
};
