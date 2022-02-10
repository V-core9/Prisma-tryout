
const port = 3000;
const cluster = require("cluster");
const totalCPUs = Math.trunc(require("os").cpus().length * 0.75);


if (cluster.isMaster) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  appModels = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

  const express = require("express");
  const app = express();

  app.get("/", async (req, res) => res.send("Hello!"));

  app.get("/api", async (req, res) => res.json({
    timestamp: Date.now(),
    models: appModels,
    coreCore: 'Vc9_initPrisma',
    version: '1.0.0'
  }));

  app.get("/api/page", async (req, res) => res.json(await prisma.page.findMany({ take: 5 })));

  app.get("/api/page/:slug", async (req, res) => res.json(await prisma.page.findUnique({ where: { slug: req.params.slug } })));

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
