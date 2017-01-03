var autoObj = new Object();
//console.log(autoObj);
var count = 0;

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


 // parallax

    $(document).ready(function(){
      $('.parallax').parallax();
    });
