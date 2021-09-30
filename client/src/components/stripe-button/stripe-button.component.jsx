import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    // stripe wants price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Je0iHIyksm9kVRA4ZFaF7rKL9jsZYatAfnZnqGIkj2rdIvVdv5wWggYH0hpOgx72YVxzCfs3RjGtGx57g5XOLkD00BUKdBJDF';

    const onToken = token => { 
        axios({// axios will know to send the request to our server (localhost:5000)
            url: 'payment',
            method: 'post', 
            data: {
                amount: priceForStripe,
                token: token
            }
        })
            .then(response => {
                alert('Payment Successful');
            })
            .catch(error => {
                console.log('Payment Error: ', error);
                alert(
                    'There was an issue with your payment! Please make sure you use the provided credit card.'
                );
            });
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