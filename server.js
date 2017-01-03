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

var hbs = exphbs.create({
	defaultLayout: "main",
	helpers: {
		compare: function (lvalue, operator, rvalue, options) {

              var operators, result;
              
              if (arguments.length < 3) {
                  throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
              }
              
              if (options === undefined) {
                  options = rvalue;
                  rvalue = operator;
                  operator = "===";
              }
              
              operators = {
                  '==': function (l, r) { return l == r; },
                  '===': function (l, r) { return l === r; },
                  '!=': function (l, r) { return l != r; },
                  '!==': function (l, r) { return l !== r; },
                  '<': function (l, r) { return l < r; },
                  '>': function (l, r) { return l > r; },
                  '<=': function (l, r) { return l <= r; },
                  '>=': function (l, r) { return l >= r; },
                  'typeof': function (l, r) { return typeof l == r; }
              };
              
              if (!operators[operator]) {
                  throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
              }
              
              result = operators[operator](lvalue, rvalue);
              
              if (result) {
                  return options.fn(this);
              } else {
                  return options.inverse(this);
              }

          }
	}
});

app.engine("handlebars", hbs.engine /*exphbs({ defaultLayout: "main" })*/ );
app.set("view engine", "handlebars");

//Require our models
var db = require("./models");


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
