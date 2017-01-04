var autoObj = new Object();
//console.log(autoObj);
var count = 0;
var ingredientList = [];
var uniqueIngredients = []; //Ingredient List without any duplicates
$.get("/ingredients", function(ing){
	for(i in ing){

		autoObj[ing[i].ingredient_name] = null;
		
		
	}
	console.log(autoObj);

	

	$('input.autocomplete').autocomplete({
	//loop to itterate over all raw ingredients 

   data: autoObj
 });

});

$(document).on("click", ".btn", function(event){
	console.log(this.dataset.ingredients);
	var splittingIngredients = this.dataset.ingredients.split(",");
	ingredientList = ingredientList.concat(splittingIngredients);
	var testinglocal = window.localStorage.getItem("ingredients");
	console.log(testinglocal);
	if(testinglocal !== null){
		ingredientList = ingredientList.concat(testinglocal.split(","));
	}
	$.each(ingredientList, function(i, el){
		if($.inArray(el, uniqueIngredients)=== -1){
			uniqueIngredients.push(el);
		}
	});
	console.log("Ingredients: " + ingredientList);
	console.log("No duplicates: " + uniqueIngredients);
	
	window.localStorage.setItem("ingredients", uniqueIngredients);
	console.log(window.localStorage);
});
 // parallax

    $(document).ready(function(){
      $('.parallax').parallax();
    });
