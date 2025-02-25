"use client";

export default function PaymentPage() {
  // Placeholder data for the dashboard
  const paymentData = {
    receivedPayments: 1500, // e.g., total received payments in dollars
    pendingDues: 250,       // e.g., pending payment amount in dollars
    reminders: [
      { id: 1, message: "Payment due for Math class", dueDate: "2025-05-09" },
      { id: 2, message: "Payment due for Chemistry class", dueDate: "2025-05-11" },
    ],
  };

  return (
    <div className="h-[calc(100vh-200px)] max-w-2xl mx-auto bg-white shadow rounded p-4 overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold">Payment Dashboard</h3>
        <p className="text-gray-600">
          View your received payments, pending dues, and upcoming payment reminders.
        </p>
      </div>
      <div className="p-4 space-y-6">
        {/* Received Payments Card */}
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <h4 className="text-lg font-bold">Received Payments</h4>
          <p className="text-2xl font-semibold text-green-600">
            ${paymentData.receivedPayments}
          </p>
        </div>
        {/* Pending Dues Card */}
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <h4 className="text-lg font-bold">Pending Dues</h4>
          <p className="text-2xl font-semibold text-red-600">
            ${paymentData.pendingDues}
          </p>
        </div>
        {/* Payment Reminders Card */}
        <div className="bg-gray-50 p-4 rounded shadow-md">
          <h4 className="text-lg font-bold mb-2">Payment Reminders</h4>
          {paymentData.reminders.length > 0 ? (
            <ul className="space-y-2">
              {paymentData.reminders.map((reminder) => (
                <li key={reminder.id} className="text-sm text-gray-700">
                  <span>{reminder.message}</span>
                  <span className="block text-xs text-gray-500">
                    Due: {reminder.dueDate}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No reminders available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
