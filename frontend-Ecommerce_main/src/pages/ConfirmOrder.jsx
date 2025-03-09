import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import axios from "axios";

const load = async () => {
  return await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
};



const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;

        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;

        default:
          setMessage("failed");
          break;
      }
    });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(`http://localhost:8080/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (message === 'succeeded') {
      update_payment();
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src="/images/error.png" alt="" />
          <Link
            className="px-5 py-2 text-white bg-green-500 rounded-sm"
            to="/dashboard/my-orders"
          >
            Back To Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src="/images/success.png" alt="" />
            <Link
              className="px-5 py-2 text-white bg-green-500 rounded-sm"
              to="/dashboard/my-orders"
            >
              Back To Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
