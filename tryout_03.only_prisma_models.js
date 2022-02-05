const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generator = require('./helpers/generator');
const { execTimers, execItem } = require('./helpers/exec_timers');

//! Test Configs:
const item_count = 2000;

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

  var data = null;

  for (let i = 0; i < item_count; i++) {
    data = await generator.newUser();
    let item = new execItem(`user_${i}`);
    await prisma.user.create({ data });
    item.end();

    data = await generator.newPost();
    let postItem = new execItem(`post_${i}`);
    await prisma.post.create({ data });
    postItem.end();

    data = await generator.newPage();
    let pageItem = new execItem(`page_${i}`);
    await prisma.page.create({ data });
    pageItem.end();

    data = await generator.newDiaryItem();
    let diaryItem = new execItem(`diary_${i}`);
    await prisma.diary.create({ data });
    diaryItem.end();
  }

  console.log(`Average Execution Time: ${execTimers.itemAVG()}ms`);
  console.log(`Exec Item Count: ${execTimers.length}`);
  console.log(`Total Execution Time: ${execTimers.seconds()}s [${execTimers.sum()}ms]`);

  await data_purge();
};

main();
