"use client";

import Button from "@/components/Button";
import CalendarPreview from "@/components/CalendarPreview";

export default function TutorDashboardPage({ setActivePage }) {
  return (
    <div className="h-full overflow-y-auto pb-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Schedule Summary Card */}
        <div className="bg-white shadow rounded">
          <div className="px-4 pt-4">
            <h3 className="text-xl font-semibold">Schedule Summary</h3>
          </div>
          <div className="p-4">
            <p className="mb-4">
              View your upcoming classes and manage your schedule.
            </p>
            <Button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActivePage("Calendar")}
            >
              View Schedule
            </Button>
          </div>
        </div>

        {/* Payment Alerts Card */}
        <div className="bg-white shadow rounded">
          <div className="px-4 pt-4">
            <h3 className="text-xl font-semibold">Payment Alerts</h3>
          </div>
          <div className="p-4">
            <p className="mb-2">Pending Payments: 2</p>
            <p className="mb-4">Received Payments: 5</p>
            <Button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setActivePage("Payment")}
            >
              Manage Payments
            </Button>
          </div>
        </div>

        {/* Recent Chat Updates Card */}
        <div className="bg-white shadow rounded">
          <div className="px-4 pt-4">
            <h3 className="text-xl font-semibold">Recent Chat Updates</h3>
          </div>
          <div className="p-4">
            <p className="mb-4">You have 3 new messages.</p>
            <Button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActivePage("Chat")}
            >
              Open Chat
            </Button>
          </div>
        </div>

        {/* Calendar Preview Card */}
        <div className="bg-white shadow rounded md:col-span-3">
          <div className="p-4 border-b">
            <h3 className="text-xl font-semibold">Calendar Overview</h3>
            <p className="text-gray-600">
              Click to see your full calendar and class schedule.
            </p>
          </div>
          <div className="p-4">
            <CalendarPreview onClick={() => setActivePage("Calendar")} />
          </div>
        </div>
      </div>
    </div>
  );
}
