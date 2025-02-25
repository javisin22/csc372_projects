"use client";

import { useState, useEffect } from "react";

export default function AjaxContent() {
    const [faqHtml, setFaqHtml] = useState("");
    const [servicesXml, setServicesXml] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contactHtml, setContactHtml] = useState("");

    useEffect(() => {
        // A) Loading HTML with AJAX using XMLHttpRequest
        loadHTMLWithXHR();
        
        // B) Loading XML with AJAX using XMLHttpRequest
        loadXMLWithXHR();
        
        // C) Loading JSON with AJAX using XMLHttpRequest
        loadJSONWithXHR();
        
        // D) Loading HTML with jQuery 
        // (jQuery will be set up in a separate effect to ensure it only runs after the component is mounted)
    }, []);

    useEffect(() => {
        // Only run this after the component has mounted to ensure jQuery is available
        if (typeof window !== 'undefined' && window.jQuery) {
            // D) Loading HTML with AJAX using jQuery
            loadHTMLWithjQuery();
        }
    }, []);

    // A) Function to load HTML content using XMLHttpRequest
    const loadHTMLWithXHR = () => {
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Set up event handler for when the response has loaded
        xhr.onload = function() {
            // Check if the server status was okay
            if (xhr.status === 200) {
                // Update state with the HTML content from responseText
                setFaqHtml(xhr.responseText);
            } else {
                console.error("Error loading FAQ HTML: ", xhr.statusText);
            }
        };
        
        // Prepare the request: HTTP GET, path to HTML file, and true for asynchronous
        xhr.open("GET", "/data/extra-faq.html", true);
        
        // Send the request
        xhr.send();
    };

    // B) Function to load XML content using XMLHttpRequest
    const loadXMLWithXHR = () => {
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Set up event handler for when the response has loaded
        xhr.onload = function() {
            // Check if the server status was okay
            if (xhr.status === 200) {
                // Get XML from the server
                const xmlDoc = xhr.responseXML;
                
                // Convert XML services to array for easier rendering
                if (xmlDoc) {
                    const serviceNodes = xmlDoc.getElementsByTagName("service");
                    const servicesArray = [];
                    
                    // Loop through the XML elements and extract data
                    for (let i = 0; i < serviceNodes.length; i++) {
                        const service = serviceNodes[i];
                        const title = service.getElementsByTagName("title")[0]?.textContent;
                        const description = service.getElementsByTagName("description")[0]?.textContent;
                        
                        servicesArray.push({ title, description });
                    }
                    
                    // Update state with the processed XML data
                    setServicesXml(servicesArray);
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
    };

    // C) Function to load JSON content using XMLHttpRequest
    const loadJSONWithXHR = () => {
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Set up event handler for readystate changes
        xhr.onreadystatechange = function() {
            // Check if the request is complete (readyState 4) and successful (status 200)
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Parse the JSON data from the responseText
                const jsonData = JSON.parse(xhr.responseText);
                
                // Update state with the JSON data
                setTestimonials(jsonData);
            } else if (xhr.readyState === 4) {
                console.error("Error loading Testimonials JSON: ", xhr.statusText);
            }
        };
        
        // Prepare the request: HTTP GET, path to JSON file, and true for asynchronous
        xhr.open("GET", "/data/testimonials.json", true);
        
        // Send the request
        xhr.send();
    };

    // D) Function to load HTML content using jQuery
    const loadHTMLWithjQuery = () => {
        // Use jQuery's load method to fetch the HTML content
        window.jQuery("#contact-container").load("/data/extra-contact-info.html", function(response, status, xhr) {
            if (status === "success") {
                // Store the HTML in state for potential further processing
                setContactHtml(response);
                
                // Add click handler for the show contact info button with jQuery effects
                window.jQuery("#show-contact-info").click(function() {
                    // Fade out the button
                    window.jQuery(this).fadeOut(300, function() {
                        // Slide down the contact info with an animation
                        window.jQuery("#extra-contact-info").slideDown(300);
                    });
                });
            } else {
                console.error("Error loading Contact HTML: ", xhr.statusText);
            }
        });
    };
    
    return (
        <div className="space-y-8">
            {/* A) Additional FAQs - Loaded with XMLHttpRequest */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Additional FAQs</h2>
                <div className="bg-white p-4 border rounded" dangerouslySetInnerHTML={{ __html: faqHtml }} />
            </section>

            {/* B) Extra Services - Loaded from XML with XMLHttpRequest */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Extra Services</h2>
                {servicesXml.length > 0 ? (
                    <div className="space-y-4">
                        {servicesXml.map((service, index) => (
                            <div key={index} className="p-4 border rounded bg-white">
                                <h3 className="text-xl font-semibold">{service.title}</h3>
                                <p className="text-gray-700">{service.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading services...</p>
                )}
            </section>

            {/* C) Testimonials - Loaded from JSON with XMLHttpRequest */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                {testimonials.length > 0 ? (
                    <ul className="space-y-2 ">
                        {testimonials.map((item) => (
                            <li key={item.id} className="p-4 border rounded bg-white">
                                <p className="italic">&quot;{item.testimonial}&quot;</p>
                                <p className="text-right text-gray-600">- {item.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading testimonials...</p>
                )}
            </section>

            {/* D) Additional Contact Information - Loaded with jQuery */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Additional Contact Information</h2>
                <div id="contact-container">
                    {/* jQuery will load the contact HTML content here */}
                </div>
            </section>
        </div>
    );
}