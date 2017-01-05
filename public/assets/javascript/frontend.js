$(document).ready(function() {
$(".button-collapse").sideNav();
  $('.parallax').parallax();
    var ingredientList = [];
    var uniqueIngredients = [];
    var autoObj = new Object();
    $.get("/recipe/api", function(recipes) {
        for (i in recipes) {
            autoObj[recipes[i].recipe_name] = null;
        }
        $.get("/ingredients", function(ing) {
            for (i in ing) {
                autoObj[ing[i].ingredient_name] = null;
            }
            $('input.autocomplete').autocomplete({
                data: autoObj
            });
        });
    });

    $(document).on("click", ".addToCartBtn", function(event) {
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

        //Toast to notify user that they've successfully added ingredients to their cart
        Materialize.toast("Added to list!", 4000, 'round-toast');
    });

// I don't know what the path is if someone wants to help that would be much obliged
    $.handlebars({
      templatePath: ''
    });
  //search for recipie
  $("#submitButton").on("click", function(){
        var userSearch = $("#autocomplete-input").val().trim();
        $()
        console.log(userSearch);
        event.preventDefault();
        $.get("/recipe/name/" + userSearch, function(rec){
          $("#recipeHolder").render('browse', {
            recipes: rec

          });


        })





  });



});
