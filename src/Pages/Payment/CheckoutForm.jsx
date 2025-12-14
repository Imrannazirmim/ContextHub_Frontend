// Create a new file: PaymentModal.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckoutForm = ({ contestId, entryFee, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // 1. Create payment intent
      const { data } = await axiosSecure.post("/payment/create-indent", {
        amount: entryFee,
      });

      // 2. Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // 3. Register participation
      if (paymentIntent.status === "succeeded") {
        const participationData = {
          contestId,
          paymentId: paymentIntent.id,
          amount: entryFee,
        };

        const response = await axiosSecure.post(
          "/participants",
          participationData,
        );

        toast.success("Payment successful! You're registered for the contest.");
        onSuccess(response.data.participantsCount);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline flex-1"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary flex-1"
        >
          {loading ? "Processing..." : `Pay $${entryFee}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
