const { users, posts } = require('../models');
const generator = require('../helpers/generator');

const item_count = 1000;

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
