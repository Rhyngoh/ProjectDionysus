$(document).ready(function(){
	var ingredientList = [];
	var uniqueIngredients = [];


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
					autoObj[recipes[i].recipe_name] = null;


				}

			});
        $.get("/ingredients", function(ing) {
            for (i in ing) {


                autoObj[ing[i].ingredient_name] = null;


            }
            console.log(autoObj);


  			});
            $('input.autocomplete').autocomplete({
                //loop to itterate over all raw ingredients

                data: autoObj
            });
}

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
    $(document).on('click', 'home', hideSearch);
    $(document).on('click', 'browse', showSearch);
});
