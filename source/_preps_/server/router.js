const { page, post, favicon, homepage } = require('./actions');

const router = {
  "/": homepage,
  "/page/": page,
  "/page": page,
  "/post/": post,
  "/post": post,
  "/favicon.ico": favicon
};

module.exports = router;
