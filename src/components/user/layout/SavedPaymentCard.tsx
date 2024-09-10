import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const SavedPaymentCard = ({card}: any) => {
    if (!card) return <p>No saved payment method found.</p>;

    return (
        <div className="flex justify-center my-4">
            <Cards
                preview={true}
                cvc="•••"
                expiry={`${card.expiryMonth}/${card.expiryYear}`}
                name={card.country}
                number={`•••• •••• •••• ${card.last4}`}
                // focused="number"
                issuer={card.brand}
            />
        </div>
    );
};

export default SavedPaymentCard;