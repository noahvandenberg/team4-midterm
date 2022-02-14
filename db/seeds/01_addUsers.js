/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakeUser = () => {
  const last_name = faker.name.lastName();
  const first_name = faker.name.firstName();
  const email = faker.internet.email(first_name,last_name)
  return {
    email: email,
    first_name: first_name,
    last_name: last_name
  };
}

exports.seed = async function(knex) {
  const fakeUsers = [];
  const desiredFakeUsers = 10;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex('users').del().insert(fakeUsers);
};
