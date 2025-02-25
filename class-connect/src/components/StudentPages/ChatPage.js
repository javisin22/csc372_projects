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
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* On small screens: Tutors list on top */}
      <div className="md:hidden border-b p-4">
        <h2 className="text-xl font-bold mb-2">Tutors</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {tutors.map((tutor) => (
            <button
              key={tutor.id}
              onClick={() => setSelectedTutor(tutor)}
              className={`flex-shrink-0 px-4 py-2 rounded ${
                selectedTutor.id === tutor.id
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tutor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 overflow-hidden">
        {/* On medium screens and above: Tutors list on the left */}
        <aside className="hidden md:block md:w-1/3 border-r p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Tutors</h2>
          <ul className="space-y-2">
            {tutors.map((tutor) => (
              <li key={tutor.id}>
                <button
                  onClick={() => setSelectedTutor(tutor)}
                  className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
                    selectedTutor.id === tutor.id ? "bg-gray-300" : ""
                  }`}
                >
                  {tutor.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Window */}
        <section className="flex-1 flex flex-col p-4">
          {/* Chat Header */}
          <header className="border-b pb-2 mb-4">
            <h2 className="text-2xl font-bold">{selectedTutor.name}</h2>
          </header>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3 pb-24">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl shadow-md max-w-[70%] ${
                    msg.sender === "student"
                      ? "bg-indigo-200 text-right"
                      : "bg-indigo-400 text-left"
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
    </div>
  );
}