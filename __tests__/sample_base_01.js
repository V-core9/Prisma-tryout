const {users, posts} = require('../models');

var faker = require('faker');

afterAll(async () => {
  await users.purge();
  await posts.purge();
});

test('adding user #1', async () => {
  const testUser = { email: faker.internet.email(), password: faker.internet.password(), username: faker.internet.userName(), salt: 'aoiobo$@$'};
  const result = await users.new(testUser);
  testUser.id = result.id;
  expect(result).toStrictEqual(testUser);
});



