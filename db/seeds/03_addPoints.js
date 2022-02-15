/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakePoint = () => {
  return {
    creator_id: Math.floor(Math.random() * 50) + 1,
    map_id: Math.floor(Math.random() * 250) + 1,
    title: faker.lorem.words(2),
    description: faker.lorem.words(20),
    image_url: faker.image.city(),
    latitude: faker.address.latitude(49,50,14),
    longitude: faker.address.latitude(-123,-124,14),
  };
}

exports.seed = async function(knex) {
  const fakePoints = [];
  const desiredFakePoints = 2500;
  for (let i = 0; i < desiredFakePoints; i++) {
    fakePoints.push(createFakePoint());
  }
  await knex('points').insert(fakePoints);
};
