const express = require('express');
const app = express();
const port = 3000;
const demoItemsCount = 50;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generator } = require('../../../helpers');

var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

v9_stringify = async (data) => {
  return JSON.stringify(data, true, 2);
};

v9_data = async () => {
  var response = {};
  for (var i = 0; i < v9_models.length; i++) {
    var model = v9_models[i];
    response[model] = await prisma[model].findMany({});
  }
  return response;
};
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


apiRoot = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(await v9_stringify({
    models: v9_models,
    version: 'v9',
    timestamp: Date.now(),
    pages: await prisma.page.findMany({ take: 5, where: { status: 'published' } })
  }), 'utf-8');
};


app.get('/', async (req, res) => res.end("Hello!"));

app.get('/api', apiRoot);
app.get('/api/:type', async (req, res) => res.json(v9_models.indexOf(req.params.type) > -1 ? await prisma[req.params.type].findMany({}) : {}));
app.get('/api/page/:path', async (req, res) => res.json(await prisma.page.findUnique({ where: { path: req.params.path } }) || {}));
app.get('/api/post/:path', async (req, res) => res.json(await prisma.post.findUnique({ where: { path: req.params.path } }) || {}));
app.get('/api/user/:username', async (req, res) => res.json(await prisma.user.findUnique({ where: { username: req.params.username } }) || {}));

app.listen(port, async () => {
  await setupDemoData();
  console.log(`Example app listening at http://localhost:${port}`);
});
