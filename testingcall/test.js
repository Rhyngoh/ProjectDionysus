var fs = require("fs");
var unirest = require("unirest");
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=true&number=30")
.header("X-Mashape-Key", "C9cicei8uamshmXFyM9wDifQnnNAp1o5BGkjsnFBUv4EO9DoLD")
.header("Accept", "application/json")
.end(function (result) {
	/*var sourceURL = JSON.stringify(result.body.recipes[0].sourceUrl);
	var creditText = JSON.stringify(result.body.recipes[0].creditText);
	var extendedIngredients = JSON.stringify(result.body.recipes[0].extendedIngredients);
	var recipeID = JSON.stringify(result.body.recipes[0].id);
	var recipeTitle = JSON.stringify(result.body.recipes[0].title);
	var image = JSON.stringify(result.body.recipes[0].image);
	var instructions = JSON.stringify(result.body.recipes[0].instructions);*/
  //fs.appendFile("test3.txt", sourceURL + "\n" + creditText + "\n" + extendedIngredients + "\n" + recipeID + "\n" + recipeTitle + "\n" + image + "\n" + instructions);
  var storedbody = JSON.stringify(result.body);
  fs.appendFile("test4.txt", storedbody);
  console.log(result.status, result.headers, result.body);
});