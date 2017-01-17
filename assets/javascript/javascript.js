$(document).ready(function() {
	var heros = ["Captian America", "Green Arrow", "Hawkeye", "Batman", "Black Widow", "Super Girl", "Iceman"];
	function displayButtons() {
		$("#gifButtons").empty();
		for (var i = 0; i < heros.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("hero");
			gifButton.addClass("btn btn-primary");
			gifButton.attr("data-name", heros[i]);
			gifButton.text(heros[i]);
			$("#gifButtons").append(gifButton);
		}
	}

	function addNewButton() {
		$("#addGif").on("click", function() {
			var hero = $("#input").val().trim();
			if (hero == "") {
				return false;
			}
		heros.push(hero);
		displayButtons();
		return false;	
		});
	}

	function displayGifs() {
		var hero = $(this).attr("data-name");
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			$("#gifViewing").empty();
			var results = response.data;
			if (results == "") {
				alert("Sorry, No GIF for this button!");
			}
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div>"); 
            	gifDiv.addClass("gifDiv");
            	var gifRating = $("<p>").text("Rating: " + results[i].rating);
            	gifDiv.append(gifRating);
               	var gifImage = $("<img>");
            	gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            	gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            	gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            	gifImage.attr("data-state", "still"); 
            	gifImage.addClass("image");
            	gifDiv.append(gifImage);
            $("#gifViewing").prepend(gifDiv);	
			}
		});
	}

	displayButtons();
	addNewButton();

	$(document).on("click", ".hero", displayGifs);
	$(document).on("click", ".image", function() {
		var state = $(this).attr('data-state');
		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
});