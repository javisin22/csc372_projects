/**
 * loadTestimonialsJson.js - External script to load Testimonials JSON content with AJAX
 * Loads the testimonials.json file using XMLHttpRequest
 */

// Function to load JSON content using XMLHttpRequest
function loadTestimonialsJson() {
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Set up event handler for readystate changes
    xhr.onreadystatechange = function() {
        // Check if the request is complete (readyState 4) and successful (status 200)
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the JSON data from the responseText
            const jsonData = JSON.parse(xhr.responseText);
            
            // Get the container element where the JSON content will be inserted
            const testimonialsContainer = document.getElementById("testimonials-container");
            
            if (testimonialsContainer) {
                // Create a variable to hold the new HTML data
                let testimonialsHtml = '<ul class="space-y-2">';
                
                // Loop through the JSON objects and add content to the HTML variable
                for (let i = 0; i < jsonData.length; i++) {
                    const testimonial = jsonData[i];
                    testimonialsHtml += `
                        <li class="p-4 border rounded">
                            <p class="italic">"${testimonial.testimonial}"</p>
                            <p class="text-right text-gray-600">- ${testimonial.name}</p>
                        </li>
                    `;
                }
                
                // Close the HTML list
                testimonialsHtml += '</ul>';
                
                // Update the container with the new HTML content
                testimonialsContainer.innerHTML = testimonialsHtml;
            }
        } else if (xhr.readyState === 4) {
            console.error("Error loading Testimonials JSON: ", xhr.statusText);
        }
    };
    
    // Prepare the request: HTTP GET, path to JSON file, and true for asynchronous
    xhr.open("GET", "/data/testimonials.json", true);
    
    // Send the request
    xhr.send();
}

// Load the Testimonials JSON content when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadTestimonialsJson);
