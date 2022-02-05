const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generator = require('./helpers/generator');
const loopy = require('./helpers/loopy');
const { execTimers, execItem } = require('./helpers/exec_timers');


//! Test Configs:
const item_count = 10;


newUserCB = async (i) => {
  let item = new execItem(`user_${i}`);
  await prisma.user.create({ data: await generator.newUser() });
  item.end();
};

newPostCB = async (i) => {
  let item = new execItem(`post_${i}`);
  await prisma.post.create({ data: await generator.newPost() });
  item.end();
};

newPageCB = async (i) => {
  let item = new execItem(`post_${i}`);
  await prisma.page.create({ data: await generator.newPost() });
  item.end();
};

newDiaryCB = async (i) => {
  let item = new execItem(`post_${i}`);
  await prisma.diary.create({ data: await generator.newPost() });
  item.end();
};

data_purge = async () => {
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.diary.deleteMany({});
};

main = async () => {
  await data_purge();

  await loopy(item_count, newUserCB);
  await loopy(item_count, newPostCB);
  await loopy(item_count, newPageCB);
  await loopy(item_count, newDiaryCB);

  console.log(`Average Execution Time: ${execTimers.itemAVG()}ms`);
  console.log(`Exec Item Count: ${execTimers.length}`);
  console.log(`Total Execution Time: ${execTimers.seconds()}s [${execTimers.sum()}ms]`);

  await data_purge();
};

main();
