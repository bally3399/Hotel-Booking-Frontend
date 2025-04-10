import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../stripePayment/stripePayment.jsx";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("your-publishable-key");

const Payment = () => {
    const location = useLocation();
    const { price } = location.state;

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col w-[90%] md:w-[40%] p-6 border-2 border-[#a68b5b] rounded-2xl">
                <p className="text-2xl text-[#a68b5b] self-center font-bold font-sans mb-4">
                    Make Payment
                </p>
                <Elements stripe={stripePromise}>
                    <PaymentForm amount={price * 100} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
