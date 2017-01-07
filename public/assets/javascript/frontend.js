$(document).ready(function() {
  //Button collapse function on smaller devices
	$(".button-collapse").sideNav();
  //Parallax function to get it running
  $('.parallax').parallax();
  //Auto complete functionality
  var autoObj = new Object();
  $.get("/recipe/api/all", function(recipes) {
    for (i in recipes) {
      autoObj[recipes[i].recipe_name] = null;
    }
    $.get("/ingredients/api/all", function(ing) {
      for (i in ing) {
          autoObj[ing[i].ingredient_name] = null;
      }
      $('input.autocomplete').autocomplete({
        data: autoObj
      });
    });
  });
  //Delegated event to add to list
  $(document).on("click", ".addToCartBtn", function(event) {
    var ingredientList = [];
    var uniqueIngredients = [];
    var splittingIngredients = this.dataset.ingredients.split(",");
    var oldstore = localStorage.getItem("ingredients");
    //If local storage is empty, store as "" to prevent null error
    if(oldstore === null){
      oldstore = "";
    }else{
      //else concat local storage to ingredient list
      ingredientList = ingredientList.concat(oldstore.split(","));
    }
    ingredientList = ingredientList.concat(splittingIngredients);
    //for each item in ingredientList, push the unique items into a unique items array
    $.each(ingredientList, function(i, el) {
      if ($.inArray(el, uniqueIngredients) === -1) {
        uniqueIngredients.push(el);
      }
    });
    //Set local storage with unique ingredients
    window.localStorage.setItem("ingredients", uniqueIngredients);
    //Toasts to notify user that they've successfully added ingredients to their cart
    if((uniqueIngredients.length - oldstore.split(",").length)===0){
      //If no items are added to the list, toast
      Materialize.toast("All of the ingredients are already in the list.", 5000, 'round-toast');
    }else{
      //If local storage is blank, write the correct number of items added
      if(oldstore === ""){
      	Materialize.toast("Added " + (uniqueIngredients.length-oldstore.split(",").length + 1) + " items into the list! --> <a href='/list'>Go To Shopping List</a>", 5000, 'round-toast');
      }else{
        //else toast the number of items added to ingredient list
      	Materialize.toast("Added " + (uniqueIngredients.length-oldstore.split(",").length) + " items into the list! --> <a href='/list'>Go To Shopping List</a>", 5000, 'round-toast');
      }
    }
  });
  //search button for recipe
  $("#submitButton").on("click", function(){
    var numRecipes = 0;
    var userSearch = $("#autocomplete-input").val().trim();
    for(item in autoObj){
      if(userSearch === item){
        $("#recipeHolder").empty();
        $("#validRecipe").html("Found something hold up");
          event.preventDefault();
        $.get("/recipe/name/" + userSearch, function(rec){
          for(i in rec){
            numRecipes ++
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
            $("#recipeHolder").append(card);
          }
          $("#searchResults").html(numRecipes + " Search results found");
          });
      } else{
        $("#validRecipe").html("No results");
          event.preventDefault();
      }
    };
  }); //End of search for recipe
  $(window).on("load", function(){
    //Masonry init
    $('.grid').masonry({
        itemSelector: '.grid-item'
    });
  });
	
});
