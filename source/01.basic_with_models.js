
const {users, posts} = require('../models');

async function main() {

  console.time('posts.new()');
  console.log(await posts.new({ title: "Hello World", content: "Hello World", published: true }));
  console.timeEnd('posts.new()');

  console.time('users.allExtended()');
  console.dir(await users.allExtended());
  console.timeEnd('users.allExtended()');

  console.time('posts.allExtended()');
  console.log(await posts.allExtended());
  console.timeEnd('posts.allExtended()');

  console.time('posts.byId(id)');
  console.log(await posts.byId(2));
  console.timeEnd('posts.byId(id)');

  console.time('users.byId(id)');
  console.log(await users.byId(2));
  console.timeEnd('users.byId(id)');

  console.time('posts.purge()');
  console.log(await posts.purge());
  console.timeEnd('posts.purge()');
}

main();
