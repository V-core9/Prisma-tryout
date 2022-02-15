const fs = require("fs");
const path = require("path");

const page = {
  "GET": async (req, res) => {
    res.send("Getting PAGES : \n" + JSON.stringify(req.parsed.query));
  },
  "POST": async (req, res) => {
    res.send("hello PAGE");
  }
};

const post = {
  "GET": async (req, res) => {
    res.send("Loading POSTS : \n" + JSON.stringify(req.parsed.query));
  },
  "POST": async (req, res) => {
    res.send("hello POST");
  }
};

const favicon = {
  "GET": async (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, "./favicon.jpeg")));
  }
};

const homepage = {
  "GET": async (req, res) => {
    res.send("Hello, you sent\n" + JSON.stringify(req.parsed.query));
  }
};

module.exports = { page, post, favicon, homepage };
