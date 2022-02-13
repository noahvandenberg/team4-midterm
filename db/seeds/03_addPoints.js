/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const { faker } = require('@faker-js/faker');
 faker.setLocale('nl');

const createFakePoint = () => {
  return {
    creator_id: Math.floor(Math.random() * 10) + 1,
    title: faker.lorem.words(2),
    description: faker.lorem.words(20),
    image_url: faker.image.city(),
    latitude: faker.address.latitude(45,55),
    longitude: faker.address.latitude(115,125),
  };
}

exports.seed = async function(knex) {
  const fakePoints = [];
  const desiredFakePoints = 1000;
  for (let i = 0; i < desiredFakePoints; i++) {
    fakePoints.push(createFakePoint());
  }
  await knex('points').insert(fakePoints);
};
