import React from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from "../components/Navbar/Navbar";

const BuySpace = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleOnSubmit = async (e) => {
        const token = sessionStorage.getItem("token")
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/create-payment-intent", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    amount: 2000, 
                    currency: 'eur',
                })
            });
            var data = null
            if (response.ok) {
                data = await response.text();
            } else {
                console.error("La réponse du serveur n'est pas OK : ", response.status, response.statusText);
            }
            const dataJSON = JSON.parse(data)
            const clientSecret = dataJSON.client_secret;
            console.log(clientSecret)
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            if (result.error) {
                console.error(result.error)
            }
            else if (result.paymentIntent.status === 'succeeded') {
                console.log("paiment reussi")
            };
        } catch (error){
            console.error('Error during paiement:', error);
        }
    }

    return (
        <>
            <Navbar />
            <section id="section-form">
                <form id="stripe" onSubmit={handleOnSubmit}>
                    <h1>Achat de Stockage</h1>
                    <CardElement />
                    <button className="basic" type="submit">Acheter</button>
                </form>
            </section>
        </>
    )
}

export default BuySpace