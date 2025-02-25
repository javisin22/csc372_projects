import Button from "@/components/Button";
import CalendarPreview from "@/components/CalendarPreview";

export default function DashboardPage({ setActivePage }) {
  return (
    <div className="h-full overflow-y-auto pb-16">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Classes Card */}
        <div className="bg-white shadow rounded">
          <div className="px-4 pt-4">
            <h3 className="text-xl font-semibold">Upcoming Classes</h3>
          </div>
          <div className="p-4">
            <p className="mb-4">You have 2 classes scheduled this week.</p>
            <Button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActivePage("Calendar")}
            >
              View Schedule
            </Button>
          </div>
        </div>

        {/* Recent Chats Card */}
        <div className="bg-white shadow rounded">
          <div className="p-4">
            <h3 className="text-xl font-semibold">Recent Chats</h3>
          </div>
          <div className="p-4">
            <p className="mb-4">You have 2 unread messages.</p>
            <Button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setActivePage("Chat")}
            >
              Open Chat
            </Button>
          </div>
        </div>

        {/* Calendar Preview Card */}
        <div className="bg-white shadow rounded md:col-span-2">
          <div className="p-4 border-b">
            <h3 className="text-xl font-semibold">Calendar Overview</h3>
            <p className="text-gray-600">Click to see full calendar and book appointments</p>
          </div>
          <div className="p-4">
            <CalendarPreview onClick={() => setActivePage("Calendar")} />
          </div>
        </div>

      </div>
    </div>
  );
}
