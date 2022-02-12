const { api, app } = require('./actions');

module.exports = [
  {
    meth: 'get',
    path: '/',
    exec: app.homepage
  },

  {
    meth: 'get',
    path: '/api',
    exec: api.root
  },

  {
    meth: 'get',
    path: '/api/:type',
    exec: api.type
  },

  {
    meth: 'get',
    path: '/api/user/:username',
    exec: api.userByUsername
  },

  {
    meth: 'get',
    path: '/api/:type/:slug',
    exec: api.typeBySlug
  },

  {
    meth: 'get',
    path: '/:slug',
    exec: app.pageBySlug
  },
];
