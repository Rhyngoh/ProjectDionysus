
$(document).ready(function(){

	var autoObj = new Object();
	//console.log(autoObj);
	var count = 0;
	var ingredientList = [];
	var uniqueIngredients = []; //Ingredient List without any duplicates
	$.get("/ingredients", function(ing){
		for(i in ing){
    autoCompleteData();
    $("#recipeSearch").hide();


    function hideSearch() {
        $('#recipeSearch').hide();
    }

    function showSearch() {
        $('#recipeSearch').show();
    }

    $('.parallax').parallax();


    //console.log(autoObj);
    var count = 0;


    function autoCompleteData() {
			var autoObj = new Object();
			$.get("/recipe", function(recipes){
				for(i in recipes){
					AutoObj[recipes[i].recipe_name] = null;


<<<<<<< HEAD
$(document).on("click", ".btn", function(event){
	console.log(this.dataset.ingredients);
	var splittingIngredients = this.dataset.ingredients.split(",");
	ingredientList = ingredientList.concat(splittingIngredients);
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
=======
				}

			});
        $.get("/ingredients", function(ing) {
            for (i in ing) {
>>>>>>> test

                ingAutoObj[ing[i].ingredient_name] = null;


            }
            console.log(autoObj);


  			});
            $('input.autocomplete').autocomplete({
                //loop to itterate over all raw ingredients

                data: autoObj
            });
}
    $(document).on('click', 'home', hideSearch);
    $(document).on('click', 'browse', showSearch);
});
