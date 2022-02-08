var http = require('http');
var url = require('url');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

appModels = async () => {
  return Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());
};

getReqQuery = async (req) => {
  return url.parse(req.url, true).query;
};

jsonData = async (req, res) => {
  return JSON.stringify({
    location: req.url,
    query: await getReqQuery(req),
    models: await appModels(),
  }, true, 2);
};

reqResp = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(await jsonData(req, res),'utf-8');
};


http.createServer(async (req, res) => await reqResp(req, res)).listen(8080);
