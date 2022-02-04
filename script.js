const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

users = {
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
  }
};

posts = {
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

async function main() {

  console.time('posts.new()');
  console.log(await posts.new({ title: "Hello World", content: "Hello World", published: true, authorId: 1 }));
  console.timeEnd('posts.new()');

  console.time('users.allExtended()');
  console.dir(await users.allExtended());
  console.timeEnd('users.allExtended()');

  console.time('posts.allExtended()');
  console.log(await posts.allExtended());
  console.timeEnd('posts.allExtended()');

  console.time('posts.byId(id)');
  console.log(await posts.byId(2));
  console.timeEnd('posts.byId(id)');

  console.time('users.byId(id)');
  console.log(await users.byId(2));
  console.timeEnd('users.byId(id)');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
