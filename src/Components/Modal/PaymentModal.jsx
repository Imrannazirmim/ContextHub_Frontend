import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Pages/Payment/CheckoutForm.jsx";

const PaymentModal = ({ isOpen, onClose, contestId, entryFee, onSuccess }) => {
  if (!isOpen) return null;
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Complete Payment</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter your card details to register for this contest
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            contestId={contestId}
            entryFee={entryFee}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default PaymentModal;
