// server.js
// where your node app starts

/*
Notes - to-do:
08/18/21 - Look into how to return current time with an empty date parameter -
not sure how to get this working at present
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
  if (!req.params) {                              // if no input - doesn't work
    return res.json({error: "No Date Given"});
  } else {
    dateNumber = parseInt(req.params.date);
  }
  //res.send([dateNumber*3]);
  if (dateNumber >= -8.64e12 && dateNumber <= 8.64e15) {   // check if valid time
    res.send([dateNumber]);
  } else {
    res.json({error: "Invalid Date"});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
