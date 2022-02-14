/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Password is being stored intentionally as text for development purposes and will be converted to bcyrpt hash

 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakeUser = () => {
  const last_name = faker.name.lastName();
  const first_name = faker.name.firstName();
  const email = faker.internet.email(first_name,last_name)
  return {
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: 'password'
  };
}

exports.seed = async function(knex) {
  const fakeUsers = [];
  const desiredFakeUsers = 50;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex('users').del().insert(fakeUsers);
};
