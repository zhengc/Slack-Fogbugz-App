var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set up a URL route
app.get("/", function(req, res) {
 res.send("Heroku Demo!");
});

app.post("/fogbugz", function(req, res) {
  console.log("Command received");

  if (req.body.token == "y2ONQHnaruku0eV50W0j4AMl" && req.body.command == "/fogbugz") {
    var caseNumber = req.body.text
    var responseUrl = req.body.response_url
    console.log(req.body);

    var fogbugzRequest = {  "cmd": "search",
                          "token": "pmchhmpstpi0dmdc8tnls3fn0f3ta3",
                              "q": caseNumber,
                           "cols": ["sTitle", "sStatus"] }

    request.post({
      url: "https://ixl.fogbugz.com/f/api/0/jsonapi",
      body: JSON.stringify(fogbugzRequest)
    }, function(error, response, body){
      var responseCases = body.data.cases
      for (var i = 0; i < responseCases.length; i++){
        var fCase = responseCases[i]
        var responseText = fCase.sTitle + "\\n" + fCase.sStatus
        console.log(responseText);
        res.send(responseText);
      }
      console.log(body);
    });
  }
});

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 3000;
app.listen(port);
