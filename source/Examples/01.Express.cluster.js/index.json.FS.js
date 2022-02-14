const fs = require('fs');
const path = require('path');

require('./cluster')(JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'))));
