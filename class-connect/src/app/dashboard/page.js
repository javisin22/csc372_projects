"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

// Dedicated pages
import DashboardPage from "@/components/DashboardPage";
import CalendarPage from "@/components/CalendarPage";
import AppointmentsPage from "@/components/AppointmentsPage";
import PaymentPage from "@/components/PaymentPage";
import ChatPage from "@/components/ChatPage";
import ProfilePage from "@/components/ProfilePage";
import FeedbackPage from "@/components/FeedbackPage";
import ResourcesPage from "@/components/ResourcesPage";
import SupportPage from "@/components/SupportPage";

export default function Dashboard() {
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

  const pageComponents = {
    Dashboard: <DashboardPage onCalendarClick={() => setActivePage("Calendar")} />,
    Calendar: <CalendarPage sidebarActive={sidebarActive} />,
    Appointments: <AppointmentsPage />,
    Payment: <PaymentPage />,
    Chat: <ChatPage />,
    Profile: <ProfilePage />,
    Feedback: <FeedbackPage />,
    Resources: <ResourcesPage />,
    Support: <SupportPage />,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: fixed position so transform applies on all screens */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50
          ${sidebarActive ? "translate-x-0" : "-translate-x-full"}
          w-[300px] p-4 bg-white shadow`}
      >
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
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out 
          ${ sidebarActive ? "md:ml-[300px]" : "md:ml-0"} 
          ${activePage === "Chat" ? "overflow-y-auto" : "overflow-y-hidden"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{activePage}</h1>
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

        {pageComponents[activePage] || null}
      </main>
    </div>
  );
}
