const server = require('./index');

server.get('/miki', async (req, res) => {
  return res.send("hello Miki");
});

server.get('/page/:slug', async (req, res) => {
  return res.send("hello Miki");
});


server.listen(3000);
