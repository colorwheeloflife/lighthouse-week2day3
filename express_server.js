// ———————— SETUP ————————
var express = require("express");
var app = express();
// var bootstrap = require('bootstrap');

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";

var methodOverride = require("method-override");
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
var PORT = process.env.PORT || 3000; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

var connect = require('connect');



// ———————— KEY-CREATER FUNCTION ————————


function generateRandomString() {
  var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i = 0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
}



// ————— DATABASE CONNECTION FUNCTION —————


function connectAndThen(cb) {
  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.log('Could not connect! Unexpected error. Details below.');
      throw err;
    }
    cb(err, db);
  });
}

app.get('/', (req, res) => {
  res.json('working');
})


// ————————————————————————————————————————



// ———————— OLD DATABASE OBJECT ————————

// var urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };





// — — — — — — — — ROUTES — — — — — — — —


// ———————— HOME PAGE INDEX ————————

// app.get("/urls", (req, res) => {
//   var templateVars = { urls: db.collection("urls") };
//   res.render("urls_index", templateVars);
// });

app.get("/urls", (req, res) => {
  connectAndThen(function(err, db) {
    if(err) {
      console.log("With errors: " + err);
    }
    //query
    db.collection("urls").find().toArray((err, urls) => {
      res.render("urls_index", {urls: urls});
    });
  })
});



// ———————— NEW URL PAGE ————————

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});



// ———————— NEW URL REDIRECT TO URLS/KEY/EDIT PAGE ————————

// app.post("/urls", (req, res) => {
//   var theShortURL = generateRandomString();
//   var theLongURL = req.body.longURL;
//   db.collection("urls")[theShortURL] = theLongURL;
//   res.redirect('/urls/shortURL');
// });

// app.get("/urls/shortURL", (req, res) => {
//   var length = Object.keys(db.collection("urls")).length - 1;
//   var theShortenedURL = Object.keys(db.collection("urls"))[length];
//   res.render("urls_create", {shortURL: theShortenedURL});
// });

app.post("/urls/", (req, res) => {
  var newURL = {
    shortURL: generateRandomString(),
    longURL: req.body.longURL
  }
  connectAndThen(function(err, db) {
    db.collection("urls").insert(newURL, (err) => {
      if(err) res.status(500).json(err);
      res.redirect('/urls/' + newURL.shortURL);
    })
  })
});



// ———————— URLS/KEYS/EDIT PAGE ————————

// app.get("/urls/:key/edit", (req, res) => {
//   connectAndThen(function(err, db) {
//     if(err) {
//       console.log("With errors: " + err);
//     }
//     db.collection("urls").find().toArray((err, urls) => {
//       res.render("urls_show", {urls: urls});
//     });
//   })
// });

app.get('/urls/:key', (req, res) => {
  connectAndThen((err, db) => {
    db.collection('urls').findOne({shortURL: req.params.key}, (err, url) => {
      res.render('urls_show', {url: url} );
    })
  })
})



// ———————— TO UPDATE ————————

// app.put("/u/:shortURL", (req, res) => {
//   console.log(req.params.shortURL + "something");
//   var theKeyToEdit = req.params.shortURL;
//   var editedValue = req.body.editedURL;
//   db.collection("urls")[theKeyToEdit] = editedValue;
//   res.redirect('/urls');
// });

app.put("/urls/:key", (req, res) => {
  connectAndThen(function(err, db) {
    db.collection("urls").updateOne( { shortURL: req.params.key }, { $set: {longURL: req.body.editedURL }}, (err, url) => {
      if(err) {
        res.send("With errors: " + err);
      }
      res.redirect('/urls');
    })
  })
});



// ———————— TO DELETE ————————

// app.delete("/urls/:sURL", (req, res) => {
//   var daKeyToRemove = req.params.sURL;
//   delete db.collection("urls")[daKeyToRemove];
//   res.redirect('/urls');
// });

app.delete("/urls/:key", (req, res) => {
  connectAndThen(function(err, db) {
    db.collection("urls").deleteOne( { shortURL: req.params.key }, (err) => {
      if(err) {
        console.log("With errors: " + err);
      }
      res.redirect('/urls');
    })
  })
});



// ———————— REDIRECT TO ACTUAL LONGURL PAGE ————————

// app.get("/u/:shortURL", (req, res) => {
//   var longURL = db.collection("urls")[req.params.shortURL];
//   res.redirect(longURL);
// });

app.get("/u/:key", (req, res) => {
  connectAndThen(function(err, db) {
    db.collection('urls').findOne({shortURL: req.params.key}, (err, url) => {
      if(err) res.status(404).send('not found');
      res.redirect(url.longURL);
    })
  })
});



// ———————— LISTENER ————————

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




