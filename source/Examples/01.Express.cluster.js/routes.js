const { api, app } = require('./actions');

module.exports = [
  {
    meth: 'get',
    path: '/',
    exec: app.homepage
  },
  {
    meth: 'get',
    path: '/:slug',
    exec: api.pageBySlug
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
    path: '/api/page/:slug',
    exec: api.pageBySlug
  },
  {
    meth: 'get',
    path: '/api/post/:slug',
    exec: api.postBySlug
  },
  {
    meth: 'get',
    path: '/api/user/:username',
    exec: api.userByUsername
  }
];
