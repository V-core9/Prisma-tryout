const fs = require("fs");
const path = require("path");

const page = {
  "GET": async (req, res) => {
    res.send("GET -> PAGE\n" + JSON.stringify(req.parsed.query));
  },
  "POST": async (req, res) => {
    res.send("POST -> PAGE");
  },
  "PUT": async (req, res) => {
    res.send("PUT/UPDATE -> PAGE");
  },
  "DELETE": async (req, res) => {
    res.send("DELETE -> PAGE");
  }
};

const post = {
  "GET": async (req, res) => {
    res.send("GET -> POST\n" + JSON.stringify(req.parsed.query));
  },
  "POST": async (req, res) => {
    res.send("POST -> POST");
  },
  "PUT": async (req, res) => {
    res.send("PUT/UPDATE -> POST");
  },
  "DELETE": async (req, res) => {
    res.send("DELETE -> POST");
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
