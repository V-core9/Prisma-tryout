var faker = require('faker');

module.exports = {
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
