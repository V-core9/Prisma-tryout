const express = require('express');
const app = express();
const port = 3000;
const demoItemsCount = 50;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generator } = require('../../helpers');

var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
model_exists = async (model) => {
  return (v9_models.indexOf(model) > -1);
};

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
  return res.end(await v9_stringify({ timestamp: Date.now(), models: v9_models, coreCore: 'Vc9_initPrisma', version: '1.0.0' }), 'utf-8');
};

apiType = async (req, res) => {
  return res.end(await v9_stringify(await model_exists(req.params.type) ? await prisma[req.params.type].findMany({ take: 5 }) : {}), 'utf-8');
};

apiTypeBySlug = async (req, res) => {
  return res.end(await v9_stringify(await model_exists(req.params.type) ? await prisma[req.params.type].findUnique({ where: { slug: req.params.slug } }) : {}), 'utf-8');
};

apiPostBySlug = async (req, res) => {
  return res.json(await prisma.post.findUnique({ where: { slug: req.params.slug } }) || {});
};

apiUserByUsername = async (req, res) => res.json(await prisma.user.findUnique({ where: { username: req.params.username } }) || {});

land = async (req, res) => res.end("Hello!");

const v_routes = [
  {
    meth: 'get',
    path: '/',
    func: land
  },
  {
    meth: 'get',
    path: '/api',
    func: apiRoot
  },
  {
    meth: 'get',
    path: '/api/:type',
    func: apiType
  },
  {
    meth: 'get',
    path: '/api/page/:slug',
    func: apiTypeBySlug
  },
  {
    meth: 'get',
    path: '/api/post/:slug',
    func: apiTypeBySlug
  },
  {
    meth: 'get',
    path: '/api/user/:username',
    func: apiType
  }
];

v_routes.forEach(route => {
  app[route.meth](route.path, route.func);
});


app.listen(port, async () => {
  await setupDemoData();
  console.log(`Example app listening at http://localhost:${port}`);
});

//? This one handles around 3000req/sec [+-15%]
