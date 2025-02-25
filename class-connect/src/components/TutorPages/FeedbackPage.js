"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  // Sample student feedback data with a response field (initially empty)
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      student: "Student Javichu",
      rating: 5,
      review: "Great class! I learned a lot.",
      response: "",
    },
    {
      id: 2,
      student: "Student Ana Oto",
      rating: 4,
      review: "Very informative, but could use more examples.",
      response: "",
    },
    {
      id: 3,
      student: "Student Pilar Vela",
      rating: 3,
      review: "It was okay, but sometimes a bit too fast.",
      response: "",
    },
  ]);

  // Track which feedback is actively being responded to (by id)
  const [activeResponseId, setActiveResponseId] = useState(null);

  // Handler to update a specific feedback's response text
  const handleResponseChange = (id, value) => {
    setFeedbackList((prevFeedback) =>
      prevFeedback.map((fb) =>
        fb.id === id ? { ...fb, response: value } : fb
      )
    );
  };

  // Handler to submit a response (here we simply log and collapse the response field)
  const handleResponseSubmit = (id) => {
    console.log("Response submitted for feedback", id);
    setActiveResponseId(null);
    // In a real app, you'd send the response to your backend here.
  };

  return (
    <div className="h-[calc(100vh-200px)] max-w-2xl mx-auto overflow-y-auto bg-white shadow rounded p-6">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold">Student Feedback</h3>
        <p className="text-gray-600">
          View feedback provided by students and respond accordingly.
        </p>
      </div>
      <div className="p-4 space-y-6">
        {feedbackList.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-gray-50 p-4 rounded shadow"
          >
            <div className="mb-2">
              <p className="font-bold">{feedback.student}</p>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-6 w-6 ${
                      index < feedback.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4">{feedback.review}</p>
            {activeResponseId === feedback.id ? (
              <div>
                <textarea
                  value={feedback.response}
                  onChange={(e) =>
                    handleResponseChange(feedback.id, e.target.value)
                  }
                  className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  rows={3}
                />
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleResponseSubmit(feedback.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit Response
                  </button>
                  <button
                    onClick={() => setActiveResponseId(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {feedback.response ? (
                  <p className="text-gray-600 italic">
                    Response: {feedback.response}
                  </p>
                ) : (
                  <button
                    onClick={() => setActiveResponseId(feedback.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Respond
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
