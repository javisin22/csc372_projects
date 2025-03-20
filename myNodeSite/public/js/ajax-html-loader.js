// Function to load HTML content using XMLHttpRequest
function loadFaqHtml() {
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Set up event handler for when the response has loaded
    xhr.onload = function() {
        // Check if the server status was okay
        if (xhr.status === 200) {
            // Get the container element where the HTML will be inserted
            const faqContainer = document.getElementById("faq-container");
            
            // Update the container with the HTML content from responseText
            if (faqContainer) {
                faqContainer.innerHTML = xhr.responseText;
            }
        } else {
            console.error("Error loading FAQ HTML: ", xhr.statusText);
        }
    };
    
    // Prepare the request: HTTP GET, path to HTML file, and true for asynchronous
    xhr.open("GET", "/data/extra-faq.html", true);
    
    // Send the request
    xhr.send();
}

// Load the FAQ HTML content when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadFaqHtml);
