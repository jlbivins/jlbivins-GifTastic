
$(document).ready(function () {


    var interest = '';

    var topics = ['vacations', 'restaurants', 'music', 'fruits', 'running', 'asics',
        'reeboks', 'shoes', 'dogs', 'cats', 'birds'
    ];

    function display_buttons() {
        $("#array-interest").empty();
        for (var i = 0; i < topics.length; i++) {
            interest = topics[i];                             //loop thru questions display questions
            console.log(interest);

            var button = $("<button>");
            button.html(interest);
            button.addClass("btn btn-primary topic_buttons");
            $("#array-interest").append(button);
        }
    }
    display_buttons();

    $("#input2").on("click", function () {
        event.preventDefault();  //prevents page from reloading
        var new_topic = $("#input1").val();
        topics.push(new_topic);
        display_buttons();

    })



    $(document).on("click", ".topic_buttons", function () {
        console.log("clicked");
        var topic = $(this).html();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)

                $("#gifs-images").empty();

                var images = response.data
                console.log(images);
                for (var i = 0; i < images.length; i++) {

                    var animated = images[i].images.original.url;
                    var still = images[i].images.original_still.url;
                    var new_image = $("<img>");

                    new_image.attr("data-state", "animated")
                    new_image.attr("src", animated);
                    // new_image.attr("src", still);
                    new_image.attr("data-still", still)
                    new_image.attr("data-animate", animated)


                    // new_imdaage.attr("alt", "animation");
                    new_image.addClass("gif");
                    $("#gifs-images").append(new_image);

                    $(".gif").on("click", function () {
                        console.log("clicked on picture");
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                            console.log("state: " + state);
                        }

                    });

                }
            })
    })


});