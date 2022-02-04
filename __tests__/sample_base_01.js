const { users, posts } = require('../models');

var faker = require('faker');

//! Test Configs:
const item_count = 1000;


var generator = {
  newUser: async () => {
    return { email: faker.internet.email(), password: faker.internet.password(), username: faker.internet.userName(), salt: '123$@$' };
  },
  newPost: async () => {
    return {  title: faker.lorem.sentence(), content: faker.lorem.paragraphs(), published: false  };
  },
};

afterAll(async () => {
  await users.purge();
  await posts.purge();
});

for (var i = 0; i < item_count; i++) {
  test('adding user #' + i, async () => {
    var user = await generator.newUser();
    const result = await users.new(user);
    user.id = result.id;
    expect(result).toStrictEqual(user);
  });
}




for (var i = 0; i < item_count; i++) {
  test('adding posts #' + i, async () => {
    var post = await generator.newPost();
    const result = await posts.new(post);
    post.id = result.id;
    post.authorId = null;
    expect(result).toStrictEqual(post);
  });
}
