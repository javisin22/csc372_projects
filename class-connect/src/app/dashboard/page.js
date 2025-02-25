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

// Dedicated pages for Student view
import DashboardPageStudent from "@/components/StudentPages/DashboardPage";
import CalendarPageStudent from "@/components/StudentPages/CalendarPage";
import AppointmentsPageStudent from "@/components/StudentPages/AppointmentsPage";
import PaymentPageStudent from "@/components/StudentPages/PaymentPage";
import ChatPageStudent from "@/components/StudentPages/ChatPage";
import ProfilePageStudent from "@/components/StudentPages/ProfilePage";
import FeedbackPageStudent from "@/components/StudentPages/FeedbackPage";
import ResourcesPageStudent from "@/components/StudentPages/ResourcesPage";
import SupportPage from "@/components/SupportPage";

// Dedicated pages for Tutor view
import DashboardPageTutor from "@/components/TutorPages/DashboardPage";
import CalendarPageTutor from "@/components/TutorPages/CalendarPage";
import AppointmentsPageTutor from "@/components/TutorPages/AppointmentsPage";
import PaymentPageTutor from "@/components/TutorPages/PaymentPage";
import ChatPageTutor from "@/components/TutorPages/ChatPage";
import ProfilePageTutor from "@/components/TutorPages/ProfilePage";
import FeedbackPageTutor from "@/components/TutorPages/FeedbackPage";
import ResourcesPageTutor from "@/components/TutorPages/ResourcesPage";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarActive, setSidebarActive] = useState(true);
  const [userType, setUserType] = useState("student"); // "student" || "tutor"

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

  const pageComponentsStudent = {
    Dashboard: <DashboardPageStudent setActivePage={setActivePage} />,
    Calendar: <CalendarPageStudent sidebarActive={sidebarActive} />,
    Appointments: <AppointmentsPageStudent />,
    Payment: <PaymentPageStudent />,
    Chat: <ChatPageStudent />,
    Profile: <ProfilePageStudent />,
    Feedback: <FeedbackPageStudent />,
    Resources: <ResourcesPageStudent />,
    Support: <SupportPage />,
  };

  const pageComponentsTutor = {
    Dashboard: <DashboardPageTutor setActivePage={setActivePage} />,
    Calendar: <CalendarPageTutor sidebarActive={sidebarActive} />,
    Appointments: <AppointmentsPageTutor />,
    Payment: <PaymentPageTutor />,
    Chat: <ChatPageTutor />,
    Profile: <ProfilePageTutor />,
    Feedback: <FeedbackPageTutor />,
    Resources: <ResourcesPageTutor />,
    Support: <SupportPage />,
  };

  // Fetch user type from the server and set it to the state
  // useEffect(() => {
  //   // Fetch user type from the server
  //   setUserType(res); // res--> "student" || "tutor"
  // }, []);

  // Hide body scrollbar when Dashboard mounts
  useEffect(() => {
  if (window.jQuery) {
    const $body = window.jQuery("body"); // Cache the selection
    $body.css("overflow", "hidden"); // Prevent body from scrolling
    return () => {
      $body.css("overflow", ""); // Reset to default when unmounting component
    };
  }
  }, []);


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
          ${(activePage === "Chat" || activePage === "Profile" || activePage === "Calendar" ) ? "overflow-y-auto" : "overflow-y-hidden"}`}
      >
        <div
          id="page-header"
          className="flex justify-between items-center mb-6"
        >
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

        {/* Render the active page component */}
        {/* {pageComponentsStudent[activePage]} */}

        {userType === "student"
          ? pageComponentsStudent[activePage]
          : pageComponentsTutor[activePage]}

      </main>
    </div>
  );
}
