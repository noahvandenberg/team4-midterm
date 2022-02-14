/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakeJoin = () => {
  return {
    point_id: Math.floor(Math.random() * 2500) + 1,
    map_id: Math.floor(Math.random() * 250) + 1,
  };
}

exports.seed = async function(knex) {
  const fakeJoin = [];
  const desiredFakePoints = 2500;
  for (let i = 0; i < desiredFakePoints; i++) {
    fakeJoin.push(createFakeJoin());
  }
  await knex('maps_points').insert(fakeJoin);
};
