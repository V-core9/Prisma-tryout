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

var execTimers = [];
execTimers.itemAVG = () => {
  var sum = 0;
  execTimers.forEach(item => {
    sum += item.time;
  });
  return sum / execTimers.length;
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

  console.log(execTimers);
  console.log(`execTimers.itemAVG: ${execTimers.itemAVG()}ms`);

  await users.purge();
  await posts.purge();
};

main();
