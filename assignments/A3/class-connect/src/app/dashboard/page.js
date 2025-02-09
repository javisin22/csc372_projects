"use client";

import { useState } from "react";
import {
  Calendar,
  MessageCircle,
  CreditCard,
  User,
  Star,
  BookOpen,
  HelpCircle,
  Bell,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarActive, setSidebarActive] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Bell className="mr-2 h-4 w-4" /> },
    { name: "Calendar", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "Appointments", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "Payment", icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { name: "Chat", icon: <MessageCircle className="mr-2 h-4 w-4" /> },
    { name: "Profile", icon: <User className="mr-2 h-4 w-4" /> },
    { name: "Feedback", icon: <Star className="mr-2 h-4 w-4" /> },
    { name: "Resources", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { name: "Support", icon: <HelpCircle className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - width is toggled */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-white shadow flex flex-col ${
          sidebarActive ? "w-[300px]" : "w-0"
        }`}
      >
        {/* Sidebar Header */}
        <Link href="/" className="p-4 border-b">
            <div className="flex items-center">
                <img
                src="logo_ClassConnect_transparent.png"
                alt="ClassConnect Logo"
                className="w-32 h-auto rounded-full mr-3"
                />
                <p className="font-semibold text-lg">ClassConnect</p>
            </div>                      
        </Link>      
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActivePage(item.name)}
                    className={`w-full text-left flex items-center p-2 rounded hover:bg-gray-200 ${
                      activePage === item.name ? "bg-gray-300" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{activePage}</h1>
          {/* Sidebar toggle button */}
          <button
            onClick={() => setSidebarActive(!sidebarActive)}
            className="hover:text-gray-500"
          >
            {sidebarActive ? (
              <ArrowLeftToLine className="h-6 w-6" />
            ) : (
              <ArrowRightToLine className="h-6 w-6" />
            )}
          </button>
        </div>

        {activePage === "Dashboard" ? (
          <DashboardContent />
        ) : (
          <PlaceholderContent page={activePage} />
        )}
      </main>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Upcoming Classes Card */}
      <div className="bg-white shadow rounded">
        <div className="px-4 pt-4">
          <h3 className="text-xl font-semibold">Upcoming Classes</h3>
        </div>
        <div className="p-4">
          <p className="mb-4">You have 2 classes scheduled this week.</p>
          <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Schedule
          </Button>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white shadow rounded">
        <div className="px-4 pt-4">
          <h3 className="text-xl font-semibold">Notifications</h3>
        </div>
        <div className="p-4">
          <p className="mb-4">You have 3 new notifications.</p>
          <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View All
          </Button>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white shadow rounded">
        <div className="p-4">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
        </div>
        <div className="p-4 flex flex-col space-y-2">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Book a Class
          </Button>
          <Button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
            View Upcoming Sessions
          </Button>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white shadow rounded md:col-span-2">
        <div className="p-4 border-b">
          <h3 className="text-xl font-semibold">Calendar</h3>
          <p className="text-gray-600">Your upcoming schedule</p>
        </div>
        <div className="p-4">
          <p className="text-center py-8">Calendar placeholder</p>
        </div>
      </div>

      {/* Recent Chats Card */}
      <div className="bg-white shadow rounded">
        <div className="p-4">
          <h3 className="text-xl font-semibold">Recent Chats</h3>
        </div>
        <div className="p-4">
          <p className="mb-4">You have 2 unread messages.</p>
          <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Open Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderContent({ page }) {
  return (
    <div className="bg-white shadow rounded">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold">{page} Content</h3>
        <p className="text-gray-600">
          This is a placeholder for the {page} page content.
        </p>
      </div>
      <div className="p-4">
        <p>Content for {page} will be implemented here.</p>
      </div>
    </div>
  );
}
