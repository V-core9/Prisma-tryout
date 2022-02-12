require('./cluster')({
  port: 8000,
  routes: require('./routes'),
  maxCpu: 0.75
});
