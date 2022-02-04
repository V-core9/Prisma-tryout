const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  new: async (data) => {
    return await prisma.post.create({ data: data });
  },

  all: async () => {
    return await prisma.post.findMany();
  },

  allExtended: async () => {
    return await prisma.post.findMany({
      include: { author: true },
    });
  },

  byId: async (id) => {
    return await prisma.post.findUnique({
      where: {
        id: id
      }
    });
  },

  purge: async () => {
    return await prisma.post.deleteMany({});
  }
};
