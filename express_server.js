var express = require("express");
var app = express();

var methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
var PORT = process.env.PORT || 3000; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static('public'));


// var connect = require('connect');





//




function generateRandomString() {
  var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i = 0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
}



var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


// TO INDEX
app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});


// // TO NEW
// app.get("/urls/new", (req, res) => {
//   res.render("urls_new");
// });


// // FROM NEW — TO CREATE
// app.post("/urls", (req, res) => {
//   var theShortURL = generateRandomString();
//   var theLongURL = req.body.longURL;
//   urlDatabase[theShortURL] = theLongURL;
//   res.redirect('/urls/shortURL');
// });


// FROM NEW — TO DELETE
app.delete("/urls/:sURL", (req, res) => {
  var daKeyToRemove = req.params.sURL;
  delete urlDatabase[daKeyToRemove];
  res.redirect('/urls');
});


// TO SHOW BASED ON ID
app.get("/urls/:key/edit", (req, res) => {
  var templateVars = {
    longURL: urlDatabase[req.params.key],
    shortURL: req.params.key
  };
  res.render("urls_show", templateVars);
});


// TO UPDATE - REDIRECT
// app.post("/urls/:sURL/edit", (req, res) => {
//   // var theURLToEdit = req.params.sURL;
//     var keyToEdit = req.params.sURL;
//   res.redirect('/urls/:sURL/show');
// });


// FROM SHOW - TO UPDATE
app.put("/urls/:shortURL", (req, res) => {
  console.log(req.params.shortURL + "something");
  var theKeyToEdit = req.params.shortURL;
  var editedValue = req.body.editedURL;
  urlDatabase[theKeyToEdit] = editedValue;
  res.redirect('/urls');
});


// // TO SHORTURL PAGE
// app.get("/urls/shortURL", (req, res) => {
//   var length = Object.keys(urlDatabase).length - 1;
//   var theShortenedURL = Object.keys(urlDatabase)[length];
//   res.render("urls_create", {shortURL: theShortenedURL});
// });


// // TO ACTUAL WEBLINK
// app.get("/u/:shortURL", (req, res) => {
//   var longURL = urlDatabase[req.params.shortURL];
//   res.redirect(longURL);
// });





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
