$(document).ready(function() {

// VARIABLES
// ==================================================

// Setting up the array of shows
var topics = ["How I Met Your Mother", "Friends", "Seinfeld", "The Big Bang Theory", "Silicon Valley", "The Simpsons", "The Office", "Black Mirror", "The Handmaid's Tale"];
var convertedTopics = [];


// FUNCTIONS
// ==================================================

// Convert strings into searchable format, based on the Giphy API
var convertString = function(key) {
    key = key.replace(/ /g,"+");
    key = key.replace(/'/g,"+");
    return key;
}

// Create a twin array with the strings in searchable format
var convertTopics = function() {
    convertedTopics = topics.slice();
    for (var i = 0; i < topics.length; i++) {
        convertedTopics[i] = convertString(convertedTopics[i]);
    }
}

// Create buttons from the array
var populateButtons = function() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append("<button class='show-buttons' search-string='" + convertedTopics[i] + "'>" + topics[i] + "</button>");
    }
}


// MAIN PROCESS
// ==================================================

// Pull 10 relevant GIFs from Giphy when buttons are clicked
$(document).on("click", ".show-buttons", function(){

    var show = $(this).attr("search-string");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&api_key=Yg5eKPk0cwb3zCoKHCD0WHAn55yzVODc";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $("#results").empty();
        for (var i = 0; i < 10; i++){
            $("#results").append("<div class='images'><img src='" + response.data[i].images.fixed_height_still.url + "' class='gifs' state='still' still-url='" + response.data[i].images.fixed_height_still.url + "' animated-url='" + response.data[i].images.fixed_height.url + "'><p class='ratings'>Rating: " + response.data[i].rating + "</p></span>");
        }
    });

});


// Toggle the GIF status (still / animated)
$(document).on("click", ".gifs", function(){
    if ($(this).attr("state") === "still") {
        $(this).attr("src", $(this).attr("animated-url"));
        $(this).attr("state", "animated")
    }
    else {
        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("state", "still")
    };
});

// Add new shows to the array, based on user input
$("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    topics.push(show);
    convertTopics();
    populateButtons();
  });

// Execute the following functions on the first page load
convertTopics();
populateButtons();

});