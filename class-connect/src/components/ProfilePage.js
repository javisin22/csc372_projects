"use client";

export default function ProfilePage() {
  return (
    <div className="bg-white shadow rounded p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Personal Information Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Javier Sin"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="javier.sinpelayo@uri.edu"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(555) 555-5555"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Credit Card
            </label>
            <input
              type="text"
              placeholder="Visa **** 4242"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Billing Address
            </label>
            <input
              type="text"
              placeholder="61 Upper College Rd, Kingston, RI 02881"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="email-notifs"
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="email-notifs" className="ml-2 text-sm text-gray-700">
              Email Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sms-notifs"
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="sms-notifs" className="ml-2 text-sm text-gray-700">
              SMS Notifications
            </label>
          </div>
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
              Subscribe to Newsletter
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
}
