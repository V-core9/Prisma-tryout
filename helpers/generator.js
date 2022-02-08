var faker = require('faker');


randomMaybe = async () => {
  return Math.random() > 0.5;
};

randomPostStatus = async () => {
  return (await randomMaybe()) ? 'published' : 'draft' ;
};

module.exports = {
  newUser: async () => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      salt: '123$@$'
    };
  },
  newPost: async () => {
    var title = faker.lorem.sentence();
    return {
      title: title,
      content: faker.lorem.paragraphs(),
      status: await randomPostStatus(),
      slug: title.toLowerCase().replace(/ /g, '-'),
    };
  },
  newPage: async () => {
    var title = faker.lorem.sentence();
    return {
      title: title,
      content: faker.lorem.paragraphs(),
      status: await randomPostStatus(),
      slug: title.toLowerCase().replace(/ /g, '-'),
    };
  },
  newDiaryItem: async () => {
    var title = faker.lorem.sentence();
    return {
      title: title,
      content: faker.lorem.paragraphs(),
      status: await randomPostStatus(),
    };
  },
};
