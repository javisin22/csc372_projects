"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send { rating, review } to your backend.
    console.log("Feedback Submitted:", { rating, review });
    // Clear form after submission
    setRating(0);
    setReview("");
  };

  return (
    <div className="h-[calc(100vh-200px)] max-w-2xl mx-auto overflow-y-auto bg-white shadow rounded p-6">
      <div className="p-4 border-b">
        {/* <h3 className="text-xl font-semibold">Feedback</h3> */}
        <p className="text-gray-600">
          Please rate your completed class and leave a review.
        </p>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400 transform transition duration-200 hover:scale-110"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
