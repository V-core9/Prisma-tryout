const { users, posts } = require('./models');
var faker = require('faker');

//! Test Configs:
const item_count = 1000;


var generator = {
  newUser: async () => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      salt: '123$@$' };
  },
  newPost: async () => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      published: false
    };
  },
};

main = async () => {
  await users.purge();
  await posts.purge();

  for (let i = 0; i < item_count; i++) {
    console.time("user #" + i);
    await users.new(await generator.newUser());
    console.timeEnd("user #" + i);
  }

  for (let i = 0; i < item_count; i++) {
    console.time("post #" + i);
    await posts.new(await generator.newPost());
    console.timeEnd("post #" + i);
  }

};

main();
