//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
//Express setup
var app = express();
var PORT = process.env.PORT || 8080;
//Body Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//Set static folder to public
app.use(express.static("./public"));
//Require routes
require("./controllers/html-routes.js")(app);
//Handlebars setup
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
	console.log("Server listening on port " + PORT);
});