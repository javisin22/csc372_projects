// Wait for the document to be ready (jQuery's equivalent of DOMContentLoaded)
$(document).ready(function() {
    // Select the container element where the contact HTML will be loaded
    $("#contact-container")
        // Use jQuery's load method to load the HTML file
        .load("/data/extra-contact-info.html", function(response, status, xhr) {
            if (status === "success") {
                // Set up the click event handler for the show contact info button
                $("#show-contact-info").click(function() {
                    // Fade out the button with an animation
                    $(this).fadeOut(300, function() {
                        // Slide down the contact info with an animation
                        $("#extra-contact-info").slideDown(300);
                    });
                });
            } else {
                console.error("Error loading Contact HTML: ", xhr.statusText);
            }
        });
});
