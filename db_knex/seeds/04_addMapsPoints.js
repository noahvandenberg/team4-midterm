/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakeJoin = () => {
  return {
    point_id: Math.floor(Math.random() * 1000) + 1,
    map_id: Math.floor(Math.random() * 100) + 1,
  };
}

exports.seed = async function(knex) {
  const fakeJoin = [];
  const desiredFakePoints = 1000;
  for (let i = 0; i < desiredFakePoints; i++) {
    fakeJoin.push(createFakeJoin());
  }
  await knex('maps_points').insert(fakeJoin);
};
