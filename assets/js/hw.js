 // Initial array of game characters
 var gameCharacters = ["Link", "Mario", "Lara Croft", "Master Chief", "Mega Man"];

 // displayCharacterGifs function re-renders the HTML to display the appropriate content
 function displayCharacterGifs() {

     var gameCharacter = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         gameCharacter + "&api_key=dc6zaTOxFJmzC&limit=10";

     // Creating an AJAX call for the specific game character button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response) {
         var newRow = $("<div>").addClass("row text-center");
         var newDiv = $("<div>");

         for (var i = 0; i < 10; i++) {
             var newDiv = $("<div>");

             newDiv.addClass("characterDiv");
             newDiv.addClass("col-12 col-md-6");

             var newImg = $("<img>");

             newImg.attr("class", "character-gif");
             newImg.attr("data-state", "still");
             newImg.attr("src", response.data[i].images.fixed_height_still.url);
             newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
             newImg.attr("data-animate", response.data[i].images.fixed_height.url);

             newDiv.append(newImg);
             newDiv.append("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p><br>");
             $(newRow).append(newDiv);
         }

         $("#characters").html(newRow);


         $(".character-gif").on("click", function() {
             var state = $(this).attr("data-state");
             
             if (state === "still") {
                 var animateURL = $(this).attr("data-animate");
                 $(this).attr("data-state", "animate");
                 $(this).attr("src", animateURL);
             } else {
                 var stillURL = $(this).attr("data-still");
                 $(this).attr("data-state", "still");
                 $(this).attr("src", stillURL);

             }

         });
     });


 }

 // Function for displaying gameCharacter data
 function renderButtons() {

     // Deleting the gameCharacters prior to adding new gameCharacters
     $("#buttons").empty();

     // Looping through the array of gameCharacters
     for (var i = 0; i < gameCharacters.length; i++) {

         var a = $("<button>");
         a.addClass("gameCharacter btn btn-warning");
         a.attr("data-name", gameCharacters[i]);
         a.text(gameCharacters[i]);
         $("#buttons").append(a);
     }
 }

 // This function handles events where a gameCharacter button is clicked
 $("#addCharacters").on("click", function(event) {
     event.preventDefault();
     
     // This line grabs the input from the textbox
     var gameCharacter = $("#this-input").val().trim();

     gameCharacters.push(gameCharacter);
     $("#this-input").val("");

     renderButtons();
 });

 // Adding a click event listener to all elements with a class of "gameCharacter"
 $(document).on("click", ".gameCharacter", displayCharacterGifs);


 // Calling the renderButtons function to display the intial buttons
 renderButtons();
