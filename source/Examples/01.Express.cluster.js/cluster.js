module.exports = async (data = {}) => {
  const app = data.app || require("./app");
  const maxCpu = data.maxCpu || 0.5;
  const totalCPUs = Math.trunc(require("os").cpus().length * maxCpu);
  const cluster = require("cluster");

  if (cluster.isMaster) {
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      cluster.fork();
    });
  } else {
    app(data);
  }
};
