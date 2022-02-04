const { users, posts } = require('./models');
const generator = require('./helpers/generator');
//! Test Configs:
const item_count = 1000;

vLoop = async (count, callback) => {
  for (let i = 0; i < count; i++) {
    await callback(i);
  }
};

var execTimers = [];
execTimers.sum = () => {
  var sum = 0;
  execTimers.forEach(item => {
    sum += item.time;
  });
  return sum;
};
execTimers.itemAVG = () => {
  return execTimers.sum() / execTimers.length;
};
execTimers.seconds = () => {
  return execTimers.sum() / 1000;
};

class execItem {
  constructor(name) {
    this.txt = name;
    this.start = Date.now();
  }
  end() {
    this.end = Date.now();
    this.time = this.end - this.start;
    execTimers.push(this);
  }
}

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
