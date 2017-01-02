//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
//Express setup
var app = express();
var PORT = process.env.PORT || 3000;
//Body Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//Set static folder to public
app.use(express.static("./public"));
//Method Override setup
app.use(methodOverride("_method"));
//Require routes
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);
//Handlebars setup
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
