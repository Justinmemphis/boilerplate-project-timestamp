// server.js
// where your node app starts


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

app.get("/api/:date?", (req, res) => {
  var inputString = req.params.date;
  var parsedInputString = Date.parse(inputString);
  if (inputString === undefined) {
    var presentTimeNumber = Date.now();
    var utcTimeString = new Date(presentTimeNumber).toGMTString();
    res.json({unix: presentTimeNumber, utc: utcTimeString});
  } else if (isNaN(inputString) && !isNaN(parsedInputString)) {
    var d1 = new Date(inputString);
    d1.toGMTString();
    var extraNumber = 0;
    extraNumber = Math.floor(d1.getTime());
    d1 = d1.toGMTString();
    res.json({unix: extraNumber, utc: d1});
  } else {
    var dateNumber = 0;
    dateNumber = parseInt(inputString);
    var utcTimeString = new Date(dateNumber).toGMTString();
    if (dateNumber >= -8.64e12 && dateNumber <= 8.64e15) {
      res.json({unix: dateNumber, utc: utcTimeString});
    } else {
      res.json({error: "Invalid Date"});
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
