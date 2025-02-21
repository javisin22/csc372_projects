"use client";

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
      {/* Page Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold">Supplementary Resources</h2>
        <p className="text-gray-600">
          Access study guides, practice tests, video tutorials, and more to help you excel academically.
        </p>
      </div>

      {/* Resource Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Study Guides</h3>
          <p className="text-gray-700 text-sm">
            Detailed guides to help you understand key concepts in various subjects.
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            Learn more
          </a>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Practice Tests</h3>
          <p className="text-gray-700 text-sm">
            Test your knowledge with practice quizzes and mock exams.
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            Take a test
          </a>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
          <p className="text-gray-700 text-sm">
            Watch step-by-step tutorials on complex topics from experienced tutors.
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            Watch now
          </a>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8">
        <p className="text-gray-600 text-sm">
          More resources will be available soon.
        </p>
      </div>
    </div>
  );
}
