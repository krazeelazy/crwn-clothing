import React from "react";

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // stripe wants price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Je0iHIyksm9kVRA4ZFaF7rKL9jsZYatAfnZnqGIkj2rdIvVdv5wWggYH0hpOgx72YVxzCfs3RjGtGx57g5XOLkD00BUKdBJDF';

    const onToken = token => { // just log and make an alert because we're not processing the payment
        console.log(token);
        alert('Payment Successful');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;