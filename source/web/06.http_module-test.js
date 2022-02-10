var http = require('http');
var url = require('url');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

appModels = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

parseURL = async (req) => {
  return url.parse(req.url, true);
};

jsonData = async () => {
  return JSON.stringify(await prisma.page.findFirst(), true, 2);
};


http.createServer(async (req, res) => {
  return res.end(await jsonData());
}).listen(8080);

//------------------------------------------------------------------------------
//? This one handles ~20k req/sec
//! Missing some usable routing logic.
