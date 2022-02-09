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

$_data = async (type, slug) => {
  try {
    return await prisma[type].findUnique({ where: { slug: slug } });
  } catch (error) {
    return null;
  }
};

var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
v9_models.has = async (type) => (this.models.indexOf(req.params.type) > -1) ? true : false;

const api = {
  hello: async (req, res) => res.end("Hello!"),
  root : async (req, res) => res.end({ timestamp: Date.now(), models: v9_models, coreCore: 'Vc9_initPrisma', version: '1.0.0' }),
  type : async (req, res) => res.end(await v9_models.has(req.params.type) ? await prisma[req.params.type].findMany({ take: 5 }) : {}),
  page : async (req, res) => res.end(await $_data('page', req.params.slug)),
  post : async (req, res) => res.end(await $_data('post', req.params.slug))
};

app.get('/', api.hello);
app.get('/api', api.root);
app.get('/api/:type', api.type);
app.get('/api/page/:slug', api.page);
app.get('/api/post/:slug', api.post);

app.listen(port);
//? This one handles around ~150k req/sec [+-15%]
