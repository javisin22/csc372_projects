// Function to load XML content using XMLHttpRequest
function loadServicesXml() {
    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Set up event handler for when the response has loaded
    xhr.onload = function() {
        // Check if the server status was okay
        if (xhr.status === 200) {
            // Get XML from the server
            const xmlDoc = xhr.responseXML;
            
            // Get the container element where the XML content will be inserted
            const servicesContainer = document.getElementById("services-container");
            
            if (xmlDoc && servicesContainer) {
                // Find XML elements and loop through them
                const services = xmlDoc.getElementsByTagName("service");
                let servicesHtml = "";
                
                // Loop through each service and create HTML for it
                for (let i = 0; i < services.length; i++) {
                    const service = services[i];
                    const title = service.getElementsByTagName("title")[0]?.textContent;
                    const description = service.getElementsByTagName("description")[0]?.textContent;
                    
                    // Add the XML elements to the HTML content
                    servicesHtml += `
                        <div class="p-4 border rounded bg-white">
                            <h3 class="text-xl font-semibold">${title}</h3>
                            <p class="text-gray-700">${description}</p>
                        </div>
                    `;
                }
                
                // Update the container with the new HTML content
                servicesContainer.innerHTML = servicesHtml;
            }
        } else {
            console.error("Error loading Services XML: ", xhr.statusText);
        }
    };
    
    // Prepare the request: HTTP GET, path to XML file, and true for asynchronous
    xhr.open("GET", "/data/extra-services.xml", true);
    
    // Set the response type to document to get an XML document back
    xhr.responseType = "document";
    
    // Send the request
    xhr.send();
}

// Load the Services XML content when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadServicesXml);
