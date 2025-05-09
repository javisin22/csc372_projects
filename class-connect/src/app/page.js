"use client";

import Link from "next/link";
import Button from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import AnimatedContactForm from "@/components/AnimatedContactForm";
import AjaxContent from "@/components/AjaxContent";
import { Calendar, MessageCircle, CreditCard, BookOpen, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-y-auto">
      {/* External PHP Database Connection Link */}
      {/* <div className="bg-blue-50 p-3 text-center mb-4 rounded-md">
        <a 
          href="https://javiersinpelayo.rhody.dev/csc372_projects/client_site/data.php"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Access the PHP Database connection page <ExternalLink className="h-4 w-4" />
        </a>
      </div> */}

      {/* External PHP Application Link */}
      {/* <div className="bg-blue-50 p-3 text-center mb-4 rounded-md">
        <a 
          href="https://javiersinpelayo.rhody.dev/csc372_projects/client_site/appointments.php"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Access the PHP Appointments class page <ExternalLink className="h-4 w-4" />
        </a>
      </div> */}

      {/* External PHP Form, Cookies & Session Link */}
      {/* <div className="bg-blue-50 p-3 text-center mb-4 rounded-md">
        <a 
          href="https://javiersinpelayo.rhody.dev/csc372_projects/client_site/index.php"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Access the PHP Form page <ExternalLink className="h-4 w-4" />
        </a>
      </div> */}

      
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
          <Link href="auth?activeTab=signup">Get Started</Link>
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
      </div>

      {/* Services Section */}
      <div id="services" className="my-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Services</h2>
        <p className="text-xl text-gray-700 mt-4 text-center">
          ClassConnect provides a comprehensive suite of services, including:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          <li><strong>Easy Scheduling:</strong> An interactive calendar that lets you book, reschedule, and cancel appointments at your convenience.</li>
          <li><strong>Direct Communication:</strong> A built-in real-time chat system that facilitates instant, effective communication between tutors and students.</li>
          <li><strong>Secure Payments:</strong> A robust, encrypted payment system ensuring that all transactions are safe and reliable.</li>
          <li><strong>Learning Resources:</strong> Access to curated materials and practice exercises to complement your tutoring sessions.</li>
          <li><strong>Automated Reminders:</strong> Receive timely notifications for upcoming appointments and payment deadlines.</li>
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
          <AnimatedContactForm />
        </div>
      </div>

      {/* AJAX-loaded content */}
      <div className="my-16">
        <AjaxContent />
      </div>
    </div>
  );
}
