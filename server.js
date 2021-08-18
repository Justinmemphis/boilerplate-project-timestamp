// server.js
// where your node app starts

/*
Notes - to-do:
08/18/21 - look into how to modify URL output of app.get to see how to parse
into a number format.  Once in a number format can test for if a valid
number or not.  If a valid number than can process normally.  If not a
valid number then will throw error.
*/

// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// enable body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
*/

app.get("/api/:date", (req, res) => {
  const dateNumber = parseInt(req.params.date);
  res.send([dateNumber]);
  /*
  if (req.params >= -8.64e12 && req.params <= 8.64e15) {
    res.send(req.params);
  } else {
    res.json({error: "Invalid Date"});
  }
  */
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
