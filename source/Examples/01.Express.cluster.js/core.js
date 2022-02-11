const express = require('express');
const app = express();
const port = 3000;

const v_routes = require('./routes');

module.exports = () => {
  v_routes.forEach(route => {
    app[route.meth](route.path, route.func);
  });

  app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
