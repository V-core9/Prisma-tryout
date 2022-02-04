const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  new: async (data) => {
    return await prisma.user.create({ data: data });
  },

  all: async () => {
    return await prisma.user.findMany();
  },

  allExtended: async () => {
    return await prisma.user.findMany({
      include: { posts: true },
    });
  },

  byId: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: id
      }
    });
  },

  purge: async () => {
    return await prisma.user.deleteMany({});
  }
};

