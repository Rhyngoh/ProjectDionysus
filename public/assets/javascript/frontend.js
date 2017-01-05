$(document).ready(function() {
    var ingredientList = [];
    var uniqueIngredients = [];

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
        $.get("/recipe", function(recipes) {
            for (i in recipes) {
                autoObj[recipes[i].recipe_name] = null;


            }

        });
        $.get("/ingredients", function(ing) {
            for (i in ing) {


                autoObj[ing[i].ingredient_name] = null;


            }



        });
        return autoObj;

    }
    function appendToStorage(name, data){
    	var oldstore = localStorage.getItem(name);
    	if(oldstore === null) oldstore = "";
    	localStorage.setItem(name, oldstore + "," + data);
    }

    $(document).on("click", ".btn", function(event) {
        console.log(this.dataset.ingredients);
        var splittingIngredients = this.dataset.ingredients.split(",");
        var oldstore = localStorage.getItem("ingredients");
        if(oldstore === null) oldstore = "";
        ingredientList = ingredientList.concat(oldstore.split(","));
        ingredientList = ingredientList.concat(splittingIngredients);
        $.each(ingredientList, function(i, el) {
            if ($.inArray(el, uniqueIngredients) === -1) {
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

    var autoComplete = autoCompleteData();

    console.log(autoComplete);
    $('input.autocomplete').autocomplete({


        data: autoComplete
    });
});
