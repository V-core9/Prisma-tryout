const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { generator } = require('../../../helpers');

const express = require('express');
const app = express();
const port = 3000;

const appModelsList = async () => {
  return Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
};

listAll = async (req, res) => {
  res.json(await appModelsList());
};

app.get('/', listAll);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
