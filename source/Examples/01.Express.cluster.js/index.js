require('./cluster')({
  port: 8000,
  routes: require('./routes'),
  //app: require("./core"),
  maxCpu: 0.25
});
