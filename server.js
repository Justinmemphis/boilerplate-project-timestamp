// server.js
// where your node app starts

/*
Notes - to-do:
08/19/21 - res.json is really JSON.stringify "under the hood" - need to figure
out how to catch strings and variables inside to pretty output
- JSON doesn't really matter with the " " - I just need to
get the date formatted correctly and it should past the tests
08/20/21 - JSON.stringify will just convert date objects to string.  So I need
to have string setup correctly before passing to the JSON object
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
  var dateNumber = 0;
  var fooBar = parseInt(req.params.date);
  if (!req.params) {                              // if no input - doesn't work
    return res.json({error: "No Date Given"});
  } else if (fooBar.includes(".")) {
    var d1 = new Date(fooBar);
    d1.toUTCString();
    dateNumber = Math.floor(d1.getTime()/ 1000);
  } else {
    dateNumber = fooBar;
  }
  //res.send([dateNumber*3]);
  var utcTime = new Date(dateNumber).toGMTString();
  if (dateNumber >= -8.64e12 && dateNumber <= 8.64e15) {   // check if valid time
    return res.json({unix: dateNumber, utc: utcTime});
  } else {
    res.json({error: "Invalid Date"});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
