import { useState, useRef, useEffect } from "react";

export default function AvailabilityModal({ initialTitle = "", initialDescription = "", onClose, onConfirm, mode }) {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(title, description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {mode === "edit" ? "Edit Availability" : "New Availability"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="availability-title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Availability Title
          </label>
          <input
            id="availability-title"
            type="text"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
          />
          
          <label
            htmlFor="availability-description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description (optional)
          </label>
          <textarea
            id="availability-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            rows={3}
            placeholder="Add details about this availability slot"
          />
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
              disabled={!title.trim()}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}