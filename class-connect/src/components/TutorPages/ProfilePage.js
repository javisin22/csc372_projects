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
                            placeholder="Claudia Gómez"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="claudia_govi@gmail.com"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+34 123 45 67 89"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
            </div>

            {/* Professional Information Section */}
            <div className="bg-gray-50 p-4 rounded shadow mb-6">
                <h3 className="text-xl font-semibold mb-3">Professional Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            placeholder="Write a short bio about your teaching experience and expertise..."
                            rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Qualifications
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., B.Sc. in Mathematics, M.Sc. in Physics"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Details Section */}
            <div className="bg-gray-50 p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-3">Payment Details</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <input
                            type="text"
                            placeholder="Bank account, PayPal, etc."
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Preferred Payment Schedule
                        </label>
                        <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Biweekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}