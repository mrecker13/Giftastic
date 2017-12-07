var sportArray = [
  "Dallas Cowboys",
  "San Francisco Giants",
  "Sacramento Kings",
  "Everton FC"
];

$(document).ready(function(){

  function displayGif () {
    var gifValue = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BhC0n4u4Kn7Gau8RQribGsCqsZZr4e4T&q=" + gifValue + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax ({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      $("#gif-here").empty();
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifAnimate = results[i].images.fixed_height.url;
        var gifStill = results[i].images.fixed_height_still.url;
        var gifDiv = $("<div class=col-md-4>");
        var p = $("<p>");
        var rating = p.text("Rating: " + results[i].rating);
        var gifImage = $("<img class=gif>");
        gifImage.attr("src", gifStill);
        gifImage.attr("data-still", gifStill);
        gifImage.attr("data-animate", gifAnimate);
        gifImage.attr("data-state", "still");
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $("#gif-here").addClass("row");
        $("#gif-here").prepend(gifDiv);
      }
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })
    });
  }

  function createButtons () {
      $("#buttons-view").empty();

      for (var i = 0; i < sportArray.length; i++) {
          var a = $("<button>");
          a.addClass("gif-button");
          a.attr("data-name", sportArray[i]);
          a.text(sportArray[i]);
          $("#buttons-view").append(a);
      }
  }

// This function handles events where the add movie button is clicked
  $("#add-sport").on("click", function(event) {
      event.preventDefault();
      // This line of code will grab the input from the textbox
      var sport = $("#sport-input").val();
    console.log(sport);
      // The movie from the textbox is then added to our array
      sportArray.push(sport);
      console.log(sportArray);
      // Calling renderButtons which handles the processing of our movie array
      createButtons();
    });

  $(document).on("click",".gif-button",displayGif);
  createButtons ();
});