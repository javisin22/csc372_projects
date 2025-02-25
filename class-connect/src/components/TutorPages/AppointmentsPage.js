"use client";

export default function AppointmentsPage() {
  // Placeholder appointments data for Tutor view
  const appointments = [
    {
      id: 1,
      subject: "Math",
      date: "2025-05-10",
      time: "10:00 AM - 11:30 AM",
      student: "Student Alice",
      status: "Pending",
    },
    {
      id: 2,
      subject: "Chemistry",
      date: "2025-05-11",
      time: "2:00 PM - 3:30 PM",
      student: "Student Bob",
      status: "Confirmed",
    },
    {
      id: 3,
      subject: "Biology",
      date: "2025-05-12",
      time: "9:00 AM - 10:30 AM",
      student: "Student Charlie",
      status: "Pending",
    },
    {
      id: 4,
      subject: "Physics",
      date: "2025-05-13",
      time: "3:00 PM - 4:30 PM",
      student: "Student Diana",
      status: "Rescheduled",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Class Bookings</h3>
        <p className="text-gray-600">
          Below is the list of your upcoming class bookings.
        </p>
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-auto pb-10">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appt) => (
            <li key={appt.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h4 className="text-xl font-bold">{appt.subject}</h4>
                <p className="text-gray-600">Student: {appt.student}</p>
                <p className="text-gray-500 text-sm">{appt.date} | {appt.time}</p>
                <p className="text-gray-500 text-sm">Status: {appt.status}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Confirm
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Reschedule
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
