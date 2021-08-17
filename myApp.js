var express = require("express");
var app = express();

app.get("/json", (req, res) => {
  res.send("Hello json!");
});

















module.exports = app;
