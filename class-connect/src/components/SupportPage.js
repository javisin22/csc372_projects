"use client";

import ContactForm from "./ContactForm";

export default function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <div className="p-4 border-b">
        {/* <h3 className="text-xl font-semibold">Support</h3> */}
        <p className="text-gray-600">
          If you need assistance or have questions, please fill out the form below to contact your tutor.
        </p>
      </div>
      <div className="p-4">
        <ContactForm />
      </div>
    </div>
  );
}
