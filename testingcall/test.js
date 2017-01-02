var fs = require("fs");
var unirest = require("unirest");

unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=true&number=20")
.header("X-Mashape-Key", "C9cicei8uamshmXFyM9wDifQnnNAp1o5BGkjsnFBUv4EO9DoLD")
.header("Accept", "application/json")
.end(function (result) {
	var unitsArray = []; //Stores the units across all recipes
	var nameArray = []; //Stores the name of ingredients across all recipes
	var sourceURL;
	var image;
	var recipeTitle;
	var instructions;
	var recipes;
  for(var i = 0; i < result.body.recipes.length; i++){
  	var ingredientsArray = []; //Stores the original string of ingredients of ONE recipe
	var recipeIngredientsName = []; //Stores the name of ingredients of ONE recipe
	sourceURL = JSON.stringify(result.body.recipes[i].sourceUrl);
	image = JSON.stringify(result.body.recipes[i].image);
	recipeTitle = JSON.stringify(result.body.recipes[i].title);
	instructions = JSON.stringify(result.body.recipes[i].instructions);
  	result.body.recipes[i].extendedIngredients.forEach(function(item){
  		unitsArray.push(item.unit);
  		nameArray.push(item.name);
  		recipeIngredientsName.push(item.name);
  		ingredientsArray.push(item.originalString);		
  	});
  	recipes += recipeTitle + "|" + sourceURL + "|" + image + '|"' + ingredientsArray + '"|"' + recipeIngredientsName + '"|' + instructions + "~"; 
  }
  fs.appendFile("units2.txt", unitsArray + ",");
  fs.appendFile("rawingredients2.txt", nameArray + ",");
  fs.appendFile("recipe6.txt", recipes);
  //console.log(result.status, result.headers, result.body);
});