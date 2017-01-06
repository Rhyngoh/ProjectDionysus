$(document).ready(function() {
$(".button-collapse").sideNav();
  $('.parallax').parallax();
    var ingredientList = [];
    var uniqueIngredients = [];
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

    $(document).on("click", ".addToCartBtn", function(event) {
        console.log(this.dataset.ingredients);
        var splittingIngredients = this.dataset.ingredients.split(",");
        var oldstore = localStorage.getItem("ingredients");
        console.log(oldstore);
        if(oldstore === null){
        	oldstore = "";
        }else{
        	ingredientList = ingredientList.concat(oldstore.split(","));
        }
        ingredientList = ingredientList.concat(splittingIngredients);
        $.each(ingredientList, function(i, el) {
            if ($.inArray(el, uniqueIngredients) === -1) {
                uniqueIngredients.push(el);
            }
        });
        console.log("Ingredients: " + ingredientList);
        console.log("No duplicates: " + uniqueIngredients);
        window.localStorage.setItem("ingredients", uniqueIngredients);
        if((uniqueIngredients.length-oldstore.split(",").length)===0){
        	Materialize.toast("All of the ingredients are already in the list.", 5000, 'round-toast');
      	}else{
        	Materialize.toast("Added " + (uniqueIngredients.length-oldstore.split(",").length) + " items into the list! --> <a href='/list'>Go To Shopping List</a>", 5000, 'round-toast');
        }
        console.log(window.localStorage);

        //Toast to notify user that they've successfully added ingredients to their cart
    });


  //search for recipie
  $("#submitButton").on("click", function(){


        var userSearch = $("#autocomplete-input").val().trim();
        for(item in autoObj){
          if(userSearch === item){
            $("#recipeHolder").empty();
            $("#validRecipe").html("Found something hold up");

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


          }else{
            $("#validRecipe").html("No results");
            event.preventDefault();


          }
        };







  }); //End of search for recipe

  //Masonry init
  $('.grid').masonry({
    itemSelector: '.grid-item'
  });

  window.onload = function(){

    $.get("/recipe/id/{{idnumber}}", function(response){
    console.log(response);
    $(".badge").text(response.recommendations);
    $(document).on("click",".recommend", function(){
      Materialize.toast("Item has been recommended!", 5000, 'round-toast');
      $(".badge").text(response.recommendations+1);
    });
    $("#recipename").html(response.recipe_name);
    var ingArray = [];
    ingArray = response.ingredients.split(/,(?=\S)/);
    for(var i = 0; i < ingArray.length; i++){
      $("#recipeingredients").append("<li>"+ingArray[i]+"</li>");
    }
    $("#imgbox").append("<img src='" + response.recipe_image + "' alt='" + response.recipe_name + "'>");
    $("#instructions").append(response.instructions);

    $(document).on("click", ".additembtn", function(e){
      var oldstore = localStorage.getItem("ingredients");
      if(oldstore === null) oldstore = "";
      var ingredientsArr = [];
      ingredientsArr = ingredientsArr.concat(oldstore.split(","));
      ingredientsArr = ingredientsArr.concat(response.raw_ingredients.split(","));
      var uniqueIng = [];
      $.each(ingredientsArr, function(i, el){
        if($.inArray(el, uniqueIng) === -1){
          uniqueIng.push(el);
        }
      });
      window.localStorage.setItem("ingredients", uniqueIng);
      if((uniqueIng.length-oldstore.split(",").length) === 0){
        Materialize.toast("All of the ingredients are already in the list.", 5000, 'round-toast');
      }else{
        Materialize.toast("Added " + (uniqueIng.length-oldstore.split(",").length) + " items into the list! --> <a href='/list'>Go To Shopping List</a>", 5000, 'round-toast');
      }
    });

    $(".recommend").attr("id", response.id);
    //$("form").attr("action","/recipe/update/recommend/"+response.id+"_method=PUT");
    $(".recommend").on("click", function(e){
      e.preventDefault();
      $.ajax({
        method: "PUT",
        url: "/recipe/update/recommend/"+response.id,
        data: {recommendations:response.recommendations+1, id:response.id}
      }).done(function(){
        console.log("updated recommendations")
      });
    })
  });
  }

  window.onload = function(){
    $(document).on("click", ".cardclick", function(){
      var ingArray = [];
      ingArray = (this.dataset.ingredients).split(/,(?=\S)/);
      $("#ingredientsUL"+this.dataset.id).text("");
      for(var i = 0; i < ingArray.length; i++){
        $("#ingredientsUL"+this.dataset.id).append("<li>"+ingArray[i]+"</li>");
      }
    });


    };

    window.onload = function(){
      var storagevariable = window.localStorage.getItem("ingredients");
      console.log(storagevariable);
      var uniqueIng = [];
      var storagearray = storagevariable.split(",");
      $.each(storagearray, function(i, el){
        if($.inArray(el, uniqueIng) === -1){
          uniqueIng.push(el);
        }
      });
      for(var i = 0; i < uniqueIng.length; i++){
        $("#shoppingListItems").append("<li class='item'>"+uniqueIng[i]+"</li>");
      }
      $(document).on("click",".item", function(){
        console.log($(this).text());
        for (var i =0; i < uniqueIng.length; i++){
          if (uniqueIng[i] === $(this).text()){
            uniqueIng.splice(i,1);
          }
        }
        //localStorage.removeItem(this);
        this.remove();
        window.localStorage.setItem("ingredients", uniqueIng.join(","));
      })
      $("#clearbtn").on("click", function(){
        localStorage.clear();
        window.location.reload();
      });
      $("#additembutton").on("click", function(){
        var newItem = $("#addItem").val().trim();
        uniqueIng.push(newItem);
        window.localStorage.setItem("ingredients", uniqueIng.join(","));
        $("#shoppingListItems").append("<li class='item'>"+newItem+"</li>");
        $("#addItem").val("");
      });
      $(document).keypress(function (e){
        if(e.which == 13 || e.keyCode == 13){
          if($("#addItem").val().trim() !== ""){
            var newItem = $("#addItem").val().trim();
            uniqueIng.push(newItem);
            window.localStorage.setItem("ingredients", uniqueIng.join(","));
            $("#shoppingListItems").append("<li class='item'>"+newItem+"</li>");
            $("#addItem").val("");
          }
        }
      });/* texting stuff that doesnt work anymore
      $(document).on("click", "#sendText", function(response){
        console.log($("#number").val().trim());
        console.log(uniqueIng.join(", "));
        $.post("http://textbelt.com/text", {number:$("#number").val().trim(), message:uniqueIng.join(", ")})
        .done(function(response){
          console.log(response);
        })
      })*/
      $(document).on("click","#print", function(){
        printDiv();
      })
    }

    function printDiv()
    {

      var divToPrint=document.getElementById('shoppingListItems');

      var newWin=window.open('','Print-Window');

      newWin.document.open();

      newWin.document.write('<html><body onload="window.print()"><h3>Grocery List</h3>'+ divToPrint.innerHTML+'</body></html>');

      newWin.document.close();

      setTimeout(function(){newWin.close();},10);

    }

    window.onload = function(){
      $(document).on("click", ".cardclick", function(){
        var ingArray = [];
        ingArray = (this.dataset.ingredients).split(/,(?=\S)/);
        $("#ingredientsUL"+this.dataset.id).text("");
        for(var i = 0; i < ingArray.length; i++){
          $("#ingredientsUL"+this.dataset.id).append("<li>"+ingArray[i]+"</li>");
        }
      });
    };

    $("button").on("click", function(e){
        e.preventDefault();
    })

});
