$(document).ready(function() {
$(".button-collapse").sideNav();
  $('.parallax').parallax();
    //var ingredientList = [];
    //var uniqueIngredients = [];
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
    	var ingredientList = [];
    	var uniqueIngredients = [];
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


  //search for recipie
  $("#submitButton").on("click", function(){
        $("#recipeHolder").empty();
        var userSearch = $("#autocomplete-input").val().trim();

        console.log(userSearch);
        event.preventDefault();
        $.get("/recipe/name/" + userSearch, function(rec){

          for(i in rec){
              console.log(rec[i]);

            var card = $('<div class="col m4 s12"> ' +
                            '<div class="card hoverable">' +
                              '<div class="card-image waves-effect waves-block waves-light">' +
                                '<img class="activator cardclick" data-id="' + rec[i].id + '" data-ingredients="' + rec[i].ingredients + '" src="' + rec[i].recipe_image + '" >' +
                              '</div>' +
                              '<div class="card-content">' +
                                '<span class="card-title activator white-text text-darken-4">' + rec[i].recipe_name + '<i class="material-icons right">toc</i></span>'+
                                '<div class="card-action">'+
                                  '<p><a href="/' + rec[i].id  + '">Recipe Page</a>'+
                                  '<span class="buttonWrapper"><a class="waves-effect waves-light btn addToCartBtn" id="' + rec[i].id + '" data-recipe_name="' + rec[i].recipe_name + '" data-id="' + rec[i].id + '" data-ingredients=" ' + rec[i].raw_ingredients + '">Add to List</a></span>'+
                                  '</p>'+
                                '</div>'+
                              '</div>'+
                              '<div class="card-reveal">'+
                                '<span class="card-title white-text text-darken-4">' + rec[i].recipe_name + '<i class="material-icons right">close</i></span>'+
                                '<ul id="ingredientsUL' + rec[i].id + '">' + rec[i].ingredients + '</ul>'+
                                '<p><a class="waves-effect waves-light btn" id="' + rec[i].id + '" data-recipe_name="' + rec[i].recipe_name + '" data-id="' + rec[i].id + '" data-ingredients="' + rec[i].raw_ingredients + '">Add to List</a></p>'+
                              '</div>'+
                            '</div>'+
                          '</div>');
                      console.log(card);
            $("#recipeHolder").append(card);




          }

          });







  });



});
