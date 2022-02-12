
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

var v9_models = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
model_exists = async (model) => {
  return (v9_models.indexOf(model) > -1);
};

v9_stringify = async (data) => {
  return JSON.stringify(data, true, 2);
};

const api = {
  root: async (req, res) => res.end(await v9_stringify({ timestamp: Date.now(), models: v9_models, coreCore: 'Vc9_initPrisma', version: '1.0.0' }), 'utf-8'),
  type: async (req, res) => res.end(await v9_stringify(await model_exists(req.params.type) ? await prisma[req.params.type].findMany({ take: 5 }) : {}), 'utf-8'),
  pageBySlug: async (req, res) => res.end(await v9_stringify(await prisma.page.findUnique({ where: { slug: req.params.slug } })), 'utf-8'),
  postBySlug: async (req, res) => res.end(await v9_stringify(await prisma.post.findUnique({ where: { slug: req.params.slug } })), 'utf-8'),
  userByUsername: async (req, res) => res.end(await v9_stringify(await prisma.user.findUnique({ where: { username: req.params.username } }) || {}))
};

const app = {
  homepage: async (req, res) => res.end("Hello!")
};

module.exports = {api, app};
