const { users, posts } = require('./models');
const generator = require('./helpers/generator');
//! Test Configs:
const item_count = 1000;

const vLoop = require('./helpers/v_loop');
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
  await vLoop(item_count, newUserCB);
  await vLoop(item_count, newPostCB);
  console.log(`Average Execution Time: ${execTimers.itemAVG()}ms`);
  console.log(`Exec Item Count: ${execTimers.length}`);
  console.log(`Total Execution Time: ${execTimers.seconds()}s [${execTimers.sum()}ms]`);
  await users.purge();
  await posts.purge();
};

main();
