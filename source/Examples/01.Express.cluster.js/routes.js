const apiAction = require('./actions');

module.exports = [
  {
    meth: 'get',
    path: '/',
    exec: apiAction.homepage
  },

  {
    meth: 'get',
    path: '/api',
    exec: apiAction.root
  },

  {
    meth: 'get',
    path: '/api/:type',
    exec: apiAction.type
  },

  {
    meth: 'get',
    path: '/api/user/:username',
    exec: apiAction.userByUsername
  },

  {
    meth: 'get',
    path: '/api/:type/:slug',
    exec: apiAction.typeBySlug
  },

  {
    meth: 'get',
    path: '/:slug',
    exec: apiAction.pageBySlug
  },
];
