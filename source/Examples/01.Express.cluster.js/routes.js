
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

apiRoot = async (req, res) => res.end(await v9_stringify({ timestamp: Date.now(), models: v9_models, coreCore: 'Vc9_initPrisma', version: '1.0.0' }), 'utf-8');

apiType = async (req, res) => res.end(await v9_stringify(await model_exists(req.params.type) ? await prisma[req.params.type].findMany({ take: 5 }) : {}), 'utf-8');

apiTypeBySlug = async (req, res) => res.end(await v9_stringify(await model_exists(req.params.type) ? await prisma[req.params.type].findUnique({ where: { slug: req.params.slug } }) : {}), 'utf-8');

apiUserByUsername = async (req, res) => res.end(await v9_stringify(await prisma.user.findUnique({ where: { username: req.params.username } }) || {}));

homepage = async (req, res) => res.end("Hello!");

const v_routes = [
  {
    meth: 'get',
    path: '/',
    func: homepage
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
    path: '/api/:type/:slug',
    func: apiTypeBySlug
  },
  {
    meth: 'get',
    path: '/api/user/:username',
    func: apiType
  }
];


module.exports = v_routes;
