import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const stripePromise = loadStripe("your-publishable-key");

// Payment Form Component
const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Create PaymentIntent on the server
        const response = await fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        const clientSecret = await response.json();

        // Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.clientSecret, {
            payment_method: { card: cardElement },
        });

        if (error) {
            toast.error(`Payment failed: ${error.message}`);
        } else if (paymentIntent.status === "succeeded") {
            toast.success("Payment succeeded!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">
                Pay Now
            </button>
        </form>
    );
};

export default PaymentForm

