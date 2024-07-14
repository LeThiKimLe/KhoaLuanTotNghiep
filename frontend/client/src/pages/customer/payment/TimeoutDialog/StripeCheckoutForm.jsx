import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styles from './styles.module.css'
import { OptionButton } from "../../../../components/common/button";

const CheckoutForm = ({ returnUrl, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(returnUrl)

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
      console.log(paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Thanh toán thành công");
          break;
        case "processing":
          setMessage("Đang thực hiện thanh toán");
          break;
        case "requires_payment_method":
          setMessage("Thanh toán thất bại");
          break;
        default:
          setMessage("Có lỗi xảy ra. Vui lòng thử lại sau");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div>
      <div className={styles.dialog_confirmation}>
        <div className={styles.dialog_mask}></div>
        <div className={styles.dialog_dialog}>
          <form id={styles["payment-form"]} onSubmit={handleSubmit} className={styles["stripe-form"]}>
            <PaymentElement id={styles["payment-element"]} options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id={styles["submit"]} className={styles["stripe-button"]}>
              <span id={styles["button-text"]}>
                {isLoading ? <div className={styles["spinner"]} id={styles["spinner"]}></div> : "Thanh toán ngay"}
              </span>
            </button>
            <OptionButton text="Đóng" onClick={onClose}></OptionButton>
            {/* Show any error or success messages */}
            {message && <div id={styles["payment-message"]}>{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;