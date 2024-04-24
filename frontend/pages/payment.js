// // pages/index.js

// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useEffect } from 'react';

// const stripePromise = loadStripe('pk_test_51N4kbSSIJUfqLb7hHmQs0vpwTQzADHpnXUE0mDQiE3OkHeXgGJaMU2ELuSOGbBseIMGYndXc7mztU64mbq7KOSYQ00qBFAafl2'); // Replace with your Stripe publishable key

// const Payment = () => {
//     const handleClick = async () => {
//         const stripe = await stripePromise;

//         const { error } = await stripe.redirectToCheckout({
//             lineItems: [
//                 { price: 'price_1P7g9WSIJUfqLb7hqx5auAd7', quantity: 1 }, // Replace with your product price ID
//             ],
//             mode: 'payment',
//             successUrl: `${window.location.origin}/profile?tab=booking-history`,
//             cancelUrl: `${window.location.origin}/profile?tab=hostel-booking-history`,
//         });

//         if (error) {
//             console.error(error);
//         }
//     };
   
// useEffect(() => {
//     // handleClick()
//     // buyNow()
// }, [])

//     return (<></>
//         // <div>
//         //     <h1>Welcome to My Next.js App</h1>
//         //     <button onClick={handleClick}>Pay with Stripe</button>
//         // </div>
//     );
// };

// export default Payment;

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'
const CheckoutForm = () => {
  let pathname=usePathname()
  console.log(pathname);
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        key: 'rzp_test_ovrL1ExhTWhDv2',
        amount: 50000, // Amount in paisa
        currency: 'INR',
        name: 'Stay Junction',
        description: 'Product description',
        image: '/images//svg/logo.svg',
        handler: function(response) {
          // Handle success
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '8283929792'
        },
        theme: {
          color: '#3399cc'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };
useEffect(() => {
  loadRazorpay()
}, [pathname])

  return (
    <div>
    </div>
  );
};

export default CheckoutForm;
