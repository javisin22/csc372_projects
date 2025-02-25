"use client";

import { useState } from "react";

export default function ResourcesPage() {
  // State to track which modal is open ("guides", "tests", "videos", or null)
  const [modalCategory, setModalCategory] = useState(null);
  // State to hold the new URL input value
  const [newURL, setNewURL] = useState("");
  // State to hold uploaded URLs by category
  const [uploadedLinks, setUploadedLinks] = useState({
    guides: [],
    tests: [],
    videos: [],
  });

  // Handle adding a new URL to the current modal's category
  const handleAddURL = () => {
    if (!newURL.trim()) return;
    setUploadedLinks((prev) => ({
      ...prev,
      [modalCategory]: [...prev[modalCategory], newURL.trim()],
    }));
    setNewURL("");
  };

  // Render modal title based on the category
  const renderModalTitle = () => {
    if (modalCategory === "guides") return "Study Guides";
    if (modalCategory === "tests") return "Practice Tests";
    if (modalCategory === "videos") return "Video Tutorials";
    return "";
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto max-w-4xl mx-auto bg-white shadow rounded p-6">
      {/* Page Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold">Supplementary Resources</h2>
        <p className="text-gray-600">
          Manage and share study guides, practice tests, video tutorials, and more with your students.
        </p>
      </div>

      {/* Resource Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Study Guides</h3>
          <p className="text-gray-700 text-sm">
            Detailed guides to help students understand key concepts.
          </p>
          <button
            onClick={() => setModalCategory("guides")}
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            View Guides
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Practice Tests</h3>
          <p className="text-gray-700 text-sm">
            Quizzes and exams to help students test their knowledge.
          </p>
          <button
            onClick={() => setModalCategory("tests")}
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            View Tests
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
          <p className="text-gray-700 text-sm">
            Step-by-step tutorials to help students master complex topics.
          </p>
          <button
            onClick={() => setModalCategory("videos")}
            className="mt-2 inline-block text-blue-500 hover:underline text-sm"
          >
            View Videos
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8">
        <p className="text-gray-600 text-sm">
          More resources will be available soon.
        </p>
      </div>

      {/* Modal */}
      {modalCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{renderModalTitle()}</h3>
              <button onClick={() => setModalCategory(null)}>Close</button>
            </div>
            <div className="mb-4">
              <ul>
                {uploadedLinks[modalCategory].length === 0 ? (
                  <li className="text-gray-600 text-sm">No links added yet.</li>
                ) : (
                  uploadedLinks[modalCategory].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newURL}
                onChange={(e) => setNewURL(e.target.value)}
                placeholder="Enter URL"
                className="border rounded p-2 flex-1 text-sm"
              />
              <button
                onClick={handleAddURL}
                className="bg-blue-500 text-white rounded px-4 py-2 text-sm"
              >
                Add URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
