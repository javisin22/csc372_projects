import Link from "next/link";

export default function Privacy() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect personal information such as your name, email address, and payment information when you register and use our service. We also collect usage data to improve our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use your information to provide and improve our services, process payments, send notifications about appointments, and communicate important updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
            <p className="text-gray-700">
              We share your information with tutors or students as necessary for scheduling and communication purposes. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-gray-700">
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies and Tracking</h2>
            <p className="text-gray-700">
              We use cookies to enhance your experience on our platform. You can adjust your browser settings to refuse cookies, but this may limit your ability to use some features of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Communications</h2>
            <p className="text-gray-700">
              We may send you emails regarding your account, appointments, payments, and service updates. You can opt out of non-essential communications in your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information as long as necessary to provide our services and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, correct, delete, or export your personal information. Contact us at javier.sinpelayo@uri.edu to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the updated policy on this page.
            </p>
          </section>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}