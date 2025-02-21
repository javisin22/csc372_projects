"use client";

import { useEffect } from "react";
import ContactForm from "./ContactForm";

export default function AnimatedContactForm() {
  useEffect(() => {
    // Ensure jQuery is loaded
    if (typeof window !== "undefined" && window.$) {
      window.$("#show-contact").click(function () {
        // Fade out the button, then slide down the form container.
        $(this).fadeOut(300, function () {
          $("#contact-form-container").slideDown(300);
        });
      });
    }
  }, []);

  return (
    <div>
      {/* Initially show the button */}
      <button
        id="show-contact"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Show Contact Form
      </button>
      {/* Hidden form container */}
      <div id="contact-form-container" style={{ display: "none" }}>
        <ContactForm />
      </div>
    </div>
  );
}
