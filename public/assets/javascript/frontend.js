$(document).ready(function(){


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


				}

			});
        $.get("/ingredients", function(ing) {
            for (i in ing) {

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
