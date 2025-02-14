"use client";

import Link from "next/link";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import { Calendar, MessageCircle, CreditCard, BookOpen, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      {/* Main Intro Section */}
      <div className="text-center my-8">
        <h1 className="text-4xl font-extrabold">
          Streamline Your Tutoring Experience
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Book appointments, manage payments, and connect with tutors effortlessly.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="flex justify-center my-8">
        <Button>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>

      {/* Feature Section */}
      <div className="grid mt-12 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<Calendar aria-hidden="true" className="h-12 w-12 text-blue-500" />}
          title="Easy Scheduling"
          description="Book appointments with your preferred tutors at your convenience."
        />

        <FeatureCard 
          icon={<MessageCircle aria-hidden="true" className="h-12 w-12 text-blue-500" />}
          title="Direct Communication"
          description="Chat directly with tutors to discuss your learning needs."
        />

        <FeatureCard
          icon={<CreditCard aria-hidden="true" className="h-12 w-12 text-blue-500" />}
          title="Secure Payments"
          description="Process payments safely and easily through our integrated system."
        />

        <FeatureCard
          icon={<BookOpen aria-hidden="true" className="h-12 w-12 text-blue-500" />}
          title="Learning Resources"
          description="Access supplementary materials to enhance your learning experience."
        />
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center my-12">
        <h2 className="text-3xl font-bold">
          Ready to Transform Your Learning Journey?
        </h2>
        <p className="text-xl text-gray-700 mt-4">
          Join ClassConnect today and experience a new way of tutoring.
        </p>
      </div>

      <div className="flex justify-center my-8 space-x-4">
        <Button background="login">
          <Link href="/auth?activeTab=login">Learn More</Link>
        </Button>
        <Button>
          <Link href="/auth?activeTab=signup">Sign Up Now</Link>
        </Button>
      </div>

      {/* About Section */}
      <div id="about" className="my-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">About</h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          ClassConnect is designed to revolutionize the tutoring experience by bringing together students and tutors in a seamless, all-in-one platform. With our intuitive interface, users can easily schedule appointments, manage payments, and communicate in real time—all while accessing a variety of learning resources.
        </p>
        <p className="text-lg text-gray-700 mt-4 text-center">
          Our mission is to eliminate the hassles of traditional tutoring setups by offering a streamlined solution that saves time and enhances educational outcomes.
        </p>
      </div>

      {/* Services Section */}
      <div id="services" className="my-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Services</h2>
        <p className="text-xl text-gray-700 mt-4 text-center">
          ClassConnect provides a comprehensive suite of services, including:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          <li>
            <strong>Easy Scheduling:</strong> An interactive calendar that lets you book, reschedule, and cancel appointments at your convenience.
          </li>
          <li>
            <strong>Direct Communication:</strong> A built-in real-time chat system that facilitates instant, effective communication between tutors and students.
          </li>
          <li>
            <strong>Secure Payments:</strong> A robust, encrypted payment system ensuring that all transactions are safe and reliable.
          </li>
          <li>
            <strong>Learning Resources:</strong> Access to curated materials and practice exercises to complement your tutoring sessions.
          </li>
          <li>
            <strong>Automated Reminders:</strong> Receive timely notifications for upcoming appointments and payment deadlines.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="my-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">FAQ</h2>
        <div className="mt-6 space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold">How do I book a tutoring session?</h3>
            <p className="text-lg text-gray-700">
              Simply use the interactive calendar on our platform to select your preferred tutor and time slot. Once booked, you’ll receive an automatic confirmation along with reminders as the appointment approaches.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">How are payments processed?</h3>
            <p className="text-lg text-gray-700">
              Payments are processed securely through our integrated payment system, which supports multiple payment methods. Your transactions are encrypted and safe.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Can I communicate directly with my tutor?</h3>
            <p className="text-lg text-gray-700">
              Absolutely! ClassConnect features a real-time chat system, enabling you to discuss your learning needs, clarify doubts, and schedule sessions without leaving the platform.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">What learning resources are available?</h3>
            <p className="text-lg text-gray-700">
              We provide a variety of supplementary materials—including study guides, practice tests, and curated educational content—to help you excel academically.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">How do I receive appointment reminders?</h3>
            <p className="text-lg text-gray-700">
              Our platform sends automatic email and SMS notifications to ensure you never miss a scheduled session or payment deadline.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="my-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Contact</h2>
        <p className="text-xl text-gray-700 mt-4 text-center">
          Have questions or need support? Get in touch with us for more information about our tutoring services.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

// Function to process the form submission and open the user's email client
function ContactForm() {
  const [sender, setSender] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${name} doubt`);
    const body = encodeURIComponent(`Sender: ${sender}\n\nMessage:\n${message}`);
    window.location.href = `mailto:javier.sinpelayo@uri.edu?subject=${subject}&body=${body}`;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        <Button type="submit" background="login">
          Send Message
        </Button>
      </div>
    </form>
  );
}