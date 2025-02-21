"use client";

import { useState } from "react";

export default function ContactForm() {
    const [sender, setSender] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`${name} doubt`);
        const body = encodeURIComponent(`Sender: ${sender}\n\nMessage:\n${message}`);
        const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=javier.sinpelayo@uri.edu&su=${subject}&body=${body}`;
        window.open(mailtoUrl, "_blank");
    };

    return (
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
            Name
            </label>
            <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <div>
            <label htmlFor="senderEmail" className="block text-lg font-medium text-gray-700">
            Email
            </label>
            <input
            id="senderEmail"
            type="email"
            placeholder="Your Email"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
            Message
            </label>
            <textarea
            id="message"
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
            />
        </div>
        <div className="text-center">
            <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
            Send Message
            </button>
        </div>
        </form>
    );
}
