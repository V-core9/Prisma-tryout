const { api, app } = require('./actions');

module.exports = [
  {
    meth: 'get',
    path: '/',
    func: app.homepage
  },

  {
    meth: 'get',
    path: '/:slug',
    func: api.pageBySlug
  },

  {
    meth: 'get',
    path: '/api',
    func: api.root
  },

  {
    meth: 'get',
    path: '/api/:type',
    func: api.type
  },

  {
    meth: 'get',
    path: '/api/page/:slug',
    func: api.pageBySlug
  },

  {
    meth: 'get',
    path: '/api/post/:slug',
    func: api.postBySlug
  },

  {
    meth: 'get',
    path: '/api/user/:username',
    func: api.userByUsername
  }
];
