const express = require('express');
const app = express();

app.get('/', async (req, res) => res.end("Hello Express.js!"));

app.listen(3000);


//? Average Data:
//* Requests :  9943 req/sec
//* Latency  :  51.28 ms
//* Counter  :  93k requests in 10.04s
//* DataSize :  15.1 MB read
