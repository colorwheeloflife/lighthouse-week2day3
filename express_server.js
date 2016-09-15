var express = require("express");
var app = express();
app.set("view engine", "ejs");
var PORT = process.env.PORT || 3000; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static('public'));


function generateRandomString() {
  var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i = 0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
}


// var urlDatabases = req.body.longURL;

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});



app.get("/urls/:id", (req, res) => {
  var templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});


app.post("/urls", (req, res) => {
  // urlDatabase.new_key = req.body.longURL;
  console.log(req.body.longURL);  // debug statement to see POST parameters
  res.send(req.body.longURL);         // Respond with 'Ok' (we will replace this)
});


app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});









// var urlDatabase = [];

// request.on('data', function(chunk) {
//   urlDatabase.push(chunk);

// }).on('end', function() {
//   urlDatabase = Buffer.concat(urlDatabase).toString();
// })



//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com",



// };
