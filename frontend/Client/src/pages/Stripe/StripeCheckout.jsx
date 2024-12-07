import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QSbecJMpBf2NQMLmRWimHDjNlzeFQCDaOZgdrIvgbeKZ2oCGQFReuzuMDb9d7LrAV59kah5Kcb6lkZKop0l4Z6A00xEjpeTkF'); // Thay bằng public key của bạn

const CheckoutForm = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(orderData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Thành công, chuyển hướng đến trang thành công
        history.push('/success');
      }
    } catch (error) {
      setErrorMessage('Đã có lỗi xảy ra khi xử lý thanh toán');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
      </button>
    </form>
  );
};

const StripeCheckout = ({ orderData }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderData={orderData} />
    </Elements>
  );
};

export default StripeCheckout;
