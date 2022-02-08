const nanoexpress = require('nanoexpress');
const app = nanoexpress();

sample = async (req, res) => res.end("Hi, NanoExpress.js!" );
app.get('/', sample );

app.listen(3000);


//? Average Data:
//* Requests :  134598 req/sec
//* Latency  :  3.08 ms
//* Counter  :  1347k requests in 10.04s
//* DataSize :  101 MB read
