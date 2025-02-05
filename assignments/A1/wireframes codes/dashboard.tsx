"use client"

import { useState } from "react"
import { Calendar, MessageCircle, CreditCard, User, Star, BookOpen, HelpCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("Dashboard")

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
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
              <div className="font-semibold">ClassConnect</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={() => setActivePage(item.name)} isActive={activePage === item.name}>
                        {item.icon}
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{activePage}</h1>
            <SidebarTrigger />
          </div>

          {activePage === "Dashboard" && <DashboardContent />}
          {activePage !== "Dashboard" && <PlaceholderContent page={activePage} />}
        </main>
      </div>
    </SidebarProvider>
  )
}

function DashboardContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have 2 classes scheduled this week.</p>
          <Button className="mt-4">View Schedule</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have 3 new notifications.</p>
          <Button className="mt-4">View All</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <Button>Book a Class</Button>
          <Button variant="outline">View Upcoming Sessions</Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Your upcoming schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8">Calendar placeholder</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have 2 unread messages.</p>
          <Button className="mt-4">Open Chat</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function PlaceholderContent({ page }: { page: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{page} Content</CardTitle>
        <CardDescription>This is a placeholder for the {page} page content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for {page} will be implemented here.</p>
      </CardContent>
    </Card>
  )
}

