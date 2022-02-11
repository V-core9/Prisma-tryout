var maxCpuUsage = 0.5; // 0 -> 100 % CPU usage
const totalCPUs = Math.trunc(require("os").cpus().length * maxCpuUsage);

// Create a cluster with the specified number of CPUs
const cluster = require("cluster");

if (cluster.isMaster) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  require("./core")();
}
