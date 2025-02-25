"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";

// Load the Stripe.js library using the publishable key (allowing me to securely 
// work with Stripe on the client side without exposing my secret key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-4">
        <div className="p-4 border-b">
            <h3 className="text-xl font-semibold">Payment Process</h3>
            <p className="text-gray-600">
                Please enter your payment details below.
            </p>
        </div>
        <div className="p-4">
            {/* Encapsulating with "Elements" ensures that the payment form has access
                to the Stripe instance and can function properly. */}
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    </div>
  );
}
