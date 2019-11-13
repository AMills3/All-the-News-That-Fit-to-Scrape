let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");

// Require the models
let db = require("./models");

let PORT = process.env.PORT || 3000;

let app = express();

// Log the requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Routes
app.get("/scrape", function(req, res) {
  axios.get("https://www.nytimes.com/section/world").then(function(response) {
    let $ = cheerio.load(response.data);

    $("h5").each(function(i, element) {
      var result = {};

// Adding the text
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

// Creating a new article
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("The scraping is complete.");
  });
});

// Route to the database
app.get("/articles", function(req, res) {
    db.Article.find()
      .then(function(dbPopulate) {
        res.json(dbPopulate);
      })
      .catch(function(err) {
        res.json(err);
      });
});

// Route to grab an article
app.get("/articles/:id", function(req, res) {
  db.Article.findById(req.params.id)
  .populate("note")
  .then(function(dbPopulate) {
    res.json(dbPopulate);
  })
  .catch(function(err) {
    res.json(err);
  });
});

// Route to save the article
app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbPopulate) {
      return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { note: dbPopulate._id } }, { new: true });
    })
    .then(function(dbPopulate) {
      res.json(dbPopulate);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
