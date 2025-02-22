"use client";

export default function AppointmentsPage() {
  // Placeholder appointments data
  const appointments = [
    {
      id: 1,
      subject: "Math",
      date: "2025-05-10",
      time: "10:00 AM - 11:30 AM",
      tutor: "Tutor Claudia",
    },
    {
      id: 2,
      subject: "Chemistry",
      date: "2025-05-11",
      time: "2:00 PM - 3:30 PM",
      tutor: "Tutor Javier",
    },
    {
      id: 3,
      subject: "Biology",
      date: "2025-05-12",
      time: "9:00 AM - 10:30 AM",
      tutor: "Tutor Juan",
    },
    {
      id: 4,
      subject: "Physics",
      date: "2025-05-13",
      time: "3:00 PM - 4:30 PM",
      tutor: "Tutor Claudia",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Summary</h3>
        <p className="text-gray-600">
          Below are your upcoming booked classes.
        </p>
      </div>
      <div className="max-h-[550px] overflow-y-auto overflow-x-hidden pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white shadow rounded p-4 transform transition duration-200 hover:scale-105"
            >
              <h4 className="text-xl font-bold mb-2">{appt.subject}</h4>
              <p className="text-gray-600 mb-1">{appt.tutor}</p>
              <p className="text-gray-500 text-sm">{appt.date}</p>
              <p className="text-gray-500 text-sm">{appt.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
