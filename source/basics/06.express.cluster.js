
const port = 3000;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  const express = require("express");
  const app = express();

  app.get("/", async (req, res) => res.send("Hello World!"));

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
