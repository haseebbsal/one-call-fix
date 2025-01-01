'use client';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event: FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return null;
        }

        const { error } = await stripe.confirmSetup({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/tradeperson/billing`
            }
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            toast.error(error.message!)
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <PaymentElement />
                <button className="bg-color-9 rounded-lg px-16 py-2 text-white w-full" disabled={!stripe}>Submit</button>
            </form>
        </>
    )
}