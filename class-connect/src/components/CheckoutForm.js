"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create a PaymentMethod including billing details.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      // You'd normally send paymentMethod.id to your backend to create a PaymentIntent.
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          id="name"
          type="text"
          placeholder="Javier Sin Pelayo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="mt-1 p-2 border border-gray-300 rounded-md">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
