/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakeMap = () => {
 return {
  creator_id: Math.floor(Math.random() * 10) + 1,
 }
};

exports.seed = async function(knex) {
  const fakeMaps = [];
  const desiredFakeMap = 100;
  for (let i = 0; i < desiredFakeMap; i++) {
    fakeMaps.push(createFakeMap());
  }
  await knex('maps').del().insert(fakeMaps);
};
