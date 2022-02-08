var http = require('http');

http.createServer(async (req, res) => res.end('Hello HTTP-node!')).listen(3000);



//? Average Data:
//* Requests :  30184 req/sec
//* Latency  :  14.60 ms
//* Counter  :  328k requests in 10.03s
//* DataSize :  45.5 MB read
