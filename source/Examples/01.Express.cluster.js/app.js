module.exports = (data = {}) => {
  const express = require('express');
  const app = express();

  var port = data.port || 3000;
  var routes = data.routes || [];

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    app[route.meth](route.path, route.exec);
  }

  app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
