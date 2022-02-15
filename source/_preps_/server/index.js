const wc = require('./web_core');

wc.get('/miki', async (req, res) => {
  return res.send("hello Miki");
});

// This to work needs Path-to-Regex module..or something custom to replace it.
// wc.get('/page/:slug', async (req, res) => {
//   return res.send("hello Miki");
// });

wc.run(3000);
