var topics = [
    "Cats",
    "Dogs",
    "Fish",
    "Lizards",
    "Lions",
    "Flamingos",
    "Kittens",
    "Rhinos",
    "Birds",
    "Parrots",
    "Puppies",
    "Random"
];

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.attr("data-gif", topics[i]);
    button.addClass("gif-button");
    $("#button-group").append(button);
}

$("#addGip").on("click", function (e) {
    e.preventDefault();
    var alreadyExist = false;
    if (topics.indexOf($("#newGip").val()) !== -1) {
        alreadyExist = true;
    }
    if ($("#newGip").val() !== "" && alreadyExist === false) {
        var newGip = $("#newGip").val().toLowerCase();
        topics.push(newGip);
        var button = $("<button>").text(newGip);
        button.attr("data-gif", newGip);
        button.addClass("gif-button");
        $("#button-group").append(button);
    }
    $("#newGip").val("");
});

$(document).on("click", ".gif-button", function () {
    var Gipp = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        Gipp + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;

        var resultsContainerSection = $("<section class='results-container'>");

        for (var i = 0; i < results.length; i++) {
            var singleResultDiv = $("<div class='result-container'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var Giffy = $("<img class='result'>");
            Giffy.attr("src", results[i].images.fixed_height_still.url);
            Giffy.attr("data-state", "still");
            Giffy.attr("data-still", results[i].images.fixed_height_still.url);
            Giffy.attr("data-animate", results[i].images.fixed_height.url);

            singleResultDiv.prepend(Giffy);
            singleResultDiv.prepend(p);

            resultsContainerSection.prepend(singleResultDiv);
        }

        $("#giffy-group").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
