 // Initial array of gameCharacters
 var gameCharacters = ["Link", "Mario", "Lara Croft", "Master Chief"];

 // displayCharacterGifs function re-renders the HTML to display the appropriate content
 function displayCharacterGifs() {

     var gameCharacter = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
         gameCharacter + "&api_key=dc6zaTOxFJmzC&limit=10";

     // Creating an AJAX call for the specific gameCharacter button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response) {
         var newRow = $("<div>").addClass("row text-center");
         var newDiv = $("<div>");

         for (var i = 0; i < 10; i++) {
             var newDiv = $("<div>");

             newDiv.addClass("characterDiv");
             newDiv.addClass("col-6");

             var newImg = $("<img>");

             newImg.attr("class", "character-gif");
             newImg.attr("data-state", "still");
             newImg.attr("src", response.data[i].images.fixed_height_still.url);
             newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
             newImg.attr("data-animate", response.data[i].images.fixed_height.url);

             newDiv.append(newImg);
             newDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
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
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons").empty();

     // Looping through the array of gameCharacters
     for (var i = 0; i < gameCharacters.length; i++) {

         // Then dynamicaly generating buttons for each gameCharacter in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adding a class of gameCharacter to our button
         a.addClass("gameCharacter btn btn-success");
         // Adding a data-attribute
         a.attr("data-name", gameCharacters[i]);
         // Providing the initial button text
         a.text(gameCharacters[i]);
         // Adding the button to the buttons-view div
         $("#buttons").append(a);
     }
 }

 // This function handles events where a gameCharacter button is clicked
 $("#addCharacters").on("click", function(event) {
     event.preventDefault();
     // This line grabs the input from the textbox
     var gameCharacter = $("#this-input").val().trim();

     // Adding gameCharacter from the textbox to our array
     gameCharacters.push(gameCharacter);

     // Calling renderButtons which handles the processing of our gameCharacter array
     renderButtons();
 });

 // Adding a click event listener to all elements with a class of "gameCharacter"
 $(document).on("click", ".gameCharacter", displayCharacterGifs);


 // Calling the renderButtons function to display the intial buttons
 renderButtons();
