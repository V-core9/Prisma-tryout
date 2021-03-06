
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

model_exists = async (model) => {
  return (v9_models.indexOf(model) > -1);
};

v9_stringify = async (data) => {
  return JSON.stringify(data, true, 2);
};

getType = async (type) => {
  return await v9_stringify(await model_exists(type) ? await prisma[type].findMany({ take: 5 }) : {});
};
getTypeBySlug = async (type, param) => {
  const filter = !isNaN(param) ? { id: parseInt(param) } : { slug: param };
  return await v9_stringify(await model_exists(type) ? await prisma[type].findUnique({ where: filter }) : {});
};

getUserByUsername = async (username) => {
  return await v9_stringify(await prisma.user.findUnique({ where: { username: username } }));
};

apiRootInfo = async () => {
  const data = {
    timestamp: Date.now(),
    models: v9_models,
    coreCore: 'Vc9_initPrisma',
    version: '1.0.0'
  };
  return await v9_stringify(data);
};

module.exports = apiAction = {
  root: async (req, res) => res.end(await apiRootInfo()),
  type: async (req, res) => res.end(await getType(req.params.type)),
  typeBySlug: async (req, res) => res.end(await getTypeBySlug(req.params.type, req.params.slug)),
  userByUsername: async (req, res) => res.end(await getUserByUsername(req.params.username)),
  homepage: async (req, res) => res.end("Hello!"),
  pageBySlug: async (req, res) => res.end(await v9_stringify(await prisma.page.findUnique({ where: { slug: req.params.slug } }))),
};
