const nanoexpress = require('nanoexpress');
const app = nanoexpress();
const port = 3000;
const demoItemsCount = 50;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generator } = require('../../helpers');


setupDemoData = async () => {
  for (let i = 0; i < v9_models.length; i++) {
    await prisma[v9_models[i]].deleteMany();
  }

  for (let i = 0; i < demoItemsCount; i++) {
    await prisma.user.create({ data: await generator.newUser() });
    await prisma.post.create({ data: await generator.newPost() });
    await prisma.page.create({ data: await generator.newPage() });
    await prisma.diary.create({ data: await generator.newDiaryItem() });
  }
};


var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

app.get('/', async (req, res) => { return res.json("Hello!"); });

app.get('/api', async (req, res) => { return res.json({ timestamp: Date.now(), models: v9_models, coreCore: 'Vc9_initPrisma', version: '1.0.0' }); });

app.get('/api/:type', async (req, res) => { return res.json((v9_models.indexOf(req.params.type) > -1) ? await prisma[req.params.type].findMany({ take: 5 }) : {}); });

page_data = async (slug) => {
  var data = null;
  try {
    data = await prisma.page.findUnique({ where: { slug: slug } });
  } catch (error) {
  }
  return data;
};
$_data = async ( type, slug) => {
  var data = null;
  try {
    data = await prisma[type].findUnique({ where: { slug: slug } });
  } catch (error) {
  }
  return data;
};

app.get('/api/page/:slug', async (req, res) => {
  return res.send(await $_data('page', req.params.slug));
});

app.get('/api/post/:slug', async (req, res) => {
  return res.send(await $_data('post', req.params.slug));
});

app.listen(port);
//? This one handles around ~150k req/sec [+-15%]
