"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function ChatPage() {
  // Sample list of tutors (each represents a chat thread)
  const tutors = [
    { id: 1, name: "Tutor Claudia" },
    { id: 2, name: "Tutor Javier" },
    { id: 3, name: "Tutor Juan" },
  ];
  const [selectedTutor, setSelectedTutor] = useState(tutors[0]);
  const [firstLoad, setFirstLoad] = useState(true);

  // Sample messages for the selected tutor
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help you?", sender: "tutor" },
    { id: 2, text: "I need help with math.", sender: "student" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputMessage, sender: "student" },
    ]);
    setInputMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Tutor Chat List */}
      <aside className="w-1/3 border-r p-4">
        <h2 className="text-2xl font-bold mb-4">Tutors</h2>
        <ul>
          {tutors.map((tutor) => (
            <li
              key={tutor.id}
              onClick={() => setSelectedTutor(tutor)}
              className={`p-2 cursor-pointer rounded hover:bg-gray-200 ${selectedTutor.id === tutor.id ? "bg-gray-300" : ""
                }`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedTutor(tutor)}
            >
              {tutor.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Section: Chat Window */}
      <section className="flex-1 flex flex-col p-4">
        {/* Chat Header */}
        <header className="border-b pb-2 mb-4">
          <h2 className="text-2xl font-bold">{selectedTutor.name}</h2>
        </header>
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col w-full ${msg.sender === "student" ? "items-end" : "items-start"
                }`}
            >
              <div
                className={`p-3 rounded-xl shadow-md max-w-[75%] ${msg.sender === "student"
                    ? "bg-gray-200 text-right rounded-br-none"
                    : "bg-gray-400 text-left rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Message Input Area */}
        <footer className="border-t pt-2 mt-4 sticky bottom-0 bg-white">
          <div className="flex items-center">
            <textarea
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:border-blue-300 resize-none"
              rows={2}
            />
            <button
              onClick={sendMessage}
              className="ml-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              <ArrowRight className="h-5 w-5 mr-1" aria-hidden="true" />
              <span>Send</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}