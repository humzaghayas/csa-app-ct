import React from 'react';

const jsonData = [
    {
        "id": 1,
        "question": "Customer not able to login",
        "answer": "Step 1: Make sure they’re using the correct URL\nStep 2: Check their credentials\nStep 3: Reset password"
    },
    {
        "id": 2,
        "question": "How to add a discount code",
        "answer": "After you add items to your cart:\nStep 1: At the bottom of the checkout screen, find Add a discount code.\nStep 2: Enter your code.\nStep 3: Select Apply. If you added a new address, credit card, or email address, the page might reload. If this happens, re-enter the details.."
    },
    {
        "id": 3,
        "question": "App not responding",
        "answer": "Step 1: Check Your Connection (and Other Sites)\nStep 2: See if the problem is on Your end or theirs.\nStep 3:Browse a Cached Version of the Page\nStep 4: Disable Add-Ons and Other Interfering Software"
    },
    {
        "id": 4,
        "question": "Payment failures",
        "answer": "Step 1. Put Preventative Measures in Place to Avoid Failed Payments.\nStep 2 :Make Sure You and the Customer Are Notified About Failed Payments\nStep 3: Work With the Customer and Payment Gateway to Retry the Payment"
    }
];

const questions = () => {
    const formattedJsonData = JSON.stringify(jsonData, null, 2);

    return (
        <pre>{formattedJsonData}</pre>
    );
};

export default questions;
