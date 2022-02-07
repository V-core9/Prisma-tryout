const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generator, execTimers, execItem } = require('../helpers');

//! Test Configs:
const item_count = 1000;


const appModels = Object.keys(prisma._dmmf.modelMap).map(name => name.toLowerCase());

console.log(appModels);
