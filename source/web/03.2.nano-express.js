const port = 3000;

const nanoexpress = require('nanoexpress');
const app = nanoexpress();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
model_exists = async (type) => (v9_models.indexOf(type) > -1) ? true : false;

$_data = async (type, slug) => {
  try {
    return await prisma[type].findUnique({ where: { slug: slug } });
  } catch (error) {
    return null;
  }
};

DATA = async (type) => {
  try {
    return await prisma[type].findMany({ take: 5 });
  } catch (error) {
    console.log(error);
    return {};
  }
};

app.get('/', async (req, res) => {
  res.json("Hello!");
});

app.get('/api', async (req, res) => {
  res.json({
    timestamp: Date.now(),
    models: v9_models,
    coreCore: 'Vc9_initPrisma',
    version: '1.0.0'
  });
});

app.get('/api/:type', async (req, res) => {
  res.json(await DATA(req.params.type));
});

app.get('/api/page/:slug', async (req, res) => {
  res.json(await $_data('page', req.params.slug));
});

app.get('/api/post/:slug', async (req, res) => {
  res.json(await $_data('post', req.params.slug));
});

app.listen(port);
