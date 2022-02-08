const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generator, execTimers, execItem } = require('../helpers');

//! Test Configs:
const item_count = 25;

const appModels = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

purgeTable = async (name) => {
  return (appModels.indexOf(name) !== -1) ? (await prisma[name].deleteMany({})) : null;
};

purge = async (name = null) => {
  if (name === null) return;

  if (name === "<ALL>") {
    resp = [];
    for (let i = 0; i < appModels.length; i++) {
      resp.push(await purgeTable(appModels[i]));
    }
    return resp;
  } else {
    return await purgeTable(name);
  }
};


main = async () => {
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

  execTimers.end();

};

showSomeDetails = async () => {
  //? Print list of models
  console.log(appModels);
  console.log(await purge());
  console.log(await main(), await purge("<ALL>"));

  await main();
  for (let i = 0; i < appModels.length; i++) {
    console.log(`${appModels[i]}: ${await prisma[appModels[i]].count()}`);
    console.log(await prisma[appModels[i]].deleteMany());
  }
};

showSomeDetails();
