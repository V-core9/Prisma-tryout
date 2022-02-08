const { users, posts } = require('../models');
const {generator} = require('../helpers');
//! Test Configs:

const loopy = require('./helpers/loopy');
const { execTimers, execItem } = require('./helpers/exec_timers');

newUserCB = async (i) => {
  let item = new execItem(`user_${i}`);
  await users.new(await generator.newUser());
  item.end();
};

newPostCB = async (i) => {
  let item = new execItem(`post_${i}`);
  await posts.new(await generator.newPost());
  item.end();
};

main = async () => {
  await users.purge();
  await posts.purge();

  await loopy(newUserCB);
  await loopy(newPostCB);

  execTimers.end();

  await users.purge();
  await posts.purge();
};

main();
