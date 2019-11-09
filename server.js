// Required NPM
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Public
app.use(express.static(__dirname + "/public"));
const port = process.env.PORT || 3000;

// Database
require("./config/connection");

// Logger
app.use(logger("dev"));

// BodyParser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
                extended: false
}));

// Set up Handlebar
const expressHandlebars = require("express-handlebars");
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes
const routes = require("./controllers/news.js");
app.use("/",routes);

// Error
app.use(function(req, res) {
                res.render("404");
});

//Port
app.listen(port, function() {
    console.log("Listening on port:" + port);
});
