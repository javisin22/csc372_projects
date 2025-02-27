"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function ChatPage() {
  // List of students for the Tutor view
  const students = [
    { id: 1, name: "Student Javichu" },
    { id: 2, name: "Student Ana Oto" },
    { id: 3, name: "Student Pilar Vela" },
  ];
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  // Sample messages between the tutor and the selected student.
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help you today?", sender: "tutor" },
    { id: 2, text: "I'm struggling with algebra.", sender: "student" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // (Optional) Auto-scroll functionality can be enabled if needed:
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    // For tutor view, assume the tutor sends messages:
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputMessage, sender: "tutor" },
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
    <div className="flex flex-col h-[calc(100vh-150px)]">
      {/* On small screens: Students list on top */}
      <div className="md:hidden border-b p-4">
        <h2 className="text-xl font-bold mb-2">Students</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`flex-shrink-0 px-4 py-2 rounded ${
                selectedStudent.id === student.id
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {student.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 overflow-hidden">
        {/* On medium screens and above: Students list on the left */}
        <aside className="hidden md:block md:w-1/4 flex-shrink-0 border-r p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <ul className="space-y-2">
            {students.map((student) => (
              <li key={student.id}>
                <button
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
                    selectedStudent.id === student.id ? "bg-gray-300" : ""
                  }`}
                >
                  {student.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Window with fixed layout */}
        <section className="flex-1 flex flex-col relative overflow-hidden">
          {/* Chat Header */}
          <header className="border-b p-4">
            <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
          </header>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 space-y-3" style={{ height: "calc(100% - 140px)" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col w-full ${
                  msg.sender === "tutor" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl shadow-md max-w-[70%] overflow-hidden break-words ${
                    msg.sender === "tutor"
                      ? "bg-indigo-200 rounded-br-none"
                      : "bg-indigo-400 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-normal overflow-wrap-anywhere">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input Area - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-white">
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
          </div>
        </section>
      </div>
    </div>
  );
}
