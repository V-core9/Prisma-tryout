const { users, posts } = require('./models');
const generator = require('./helpers/generator');
//! Test Configs:
const item_count = 1000;

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


main = async () => {
  await users.purge();
  await posts.purge();

  for (let i = 0; i < item_count; i++) {
    let item = new execItem(`user_${i}`);
    await users.new(await generator.newUser());
    item.end();
  }

  for (let i = 0; i < item_count; i++) {
    let item = new execItem(`post_${i}`);
    await posts.new(await generator.newPost());
    item.end();
  }

  console.log(`Average Execution Time: ${execTimers.itemAVG()}ms`);
  console.log(`Exec Item Count: ${execTimers.length}`);
  console.log(`Total Execution Time: ${execTimers.seconds()}s [${execTimers.sum()}ms]`);

  await users.purge();
  await posts.purge();
};

main();
