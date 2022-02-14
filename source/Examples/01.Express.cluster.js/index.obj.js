const settings = {
  port: 8000,
  routes: require('./routes'),
  app: require("./core"),
  maxCpu: 0.25
};

require('./cluster')(settings);
