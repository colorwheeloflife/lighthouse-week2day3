var express = require("express");
var app = express();
app.set("view engine", "ejs");
var fs = require("fs");
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

// var length = Object.keys(urlDatabase).length - 1;
// var yourURL = Object.keys(urlDatabase)[length];






app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


app.post("/urls", (req, res) => {
  // res.send(req.body.longURL);
  var theShortURL = generateRandomString();
  var theLongURL = req.body.longURL;
  urlDatabase[theShortURL] = theLongURL;
  res.redirect('/urls/shortURL');
   // debug statement to see POST parameters
   // Respond with 'Ok' (we will replace this)
});



app.get("/urls/shortURL", (req, res) => {
  var length = Object.keys(urlDatabase).length - 1;
  var theShortenedURL = Object.keys(urlDatabase)[length];
  res.render("urls_create", {shortURL: theShortenedURL});
});


// for loop??
app.get("/u/:shortURL", (req, res) => {
  var longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
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
