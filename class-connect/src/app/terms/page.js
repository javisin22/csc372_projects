import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using ClassConnect, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700">
              ClassConnect provides an online platform connecting tutors with students, facilitating scheduling, communication, and payment processing for educational services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Conduct</h2>
            <p className="text-gray-700">
              Users agree not to use ClassConnect for any unlawful purpose or in any way that could damage, disable, or impair the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Payment Terms</h2>
            <p className="text-gray-700">
              All payments are processed securely through our platform. Tutors receive payment after services are rendered, subject to our commission fee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Cancellation Policy</h2>
            <p className="text-gray-700">
              Cancellations made less than 24 hours before a scheduled appointment may be subject to a cancellation fee at the tutor&apos;s discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on ClassConnect, including but not limited to text, graphics, logos, and software, is the property of ClassConnect and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              ClassConnect is not liable for any disputes between tutors and students regarding the quality of services provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Modifications to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.
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