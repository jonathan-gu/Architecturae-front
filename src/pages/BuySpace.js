import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import settings from "../assets/icons/settings.svg";
import cloud from "../assets/icons/cloud-outline.svg";
import MenuItem from "../components/MenuItem/MenuItem";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

const BuySpace = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [AutorizeStorage, setAuthorizeStorage] = useState(0)
    const [verificationCompleted, setVerificationCompleted] = useState(false)

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        if (user === null) {
            navigate("/login")
        }
        else {
            if (user.role === 'admin') {
                navigate("/admin/clients")
            }
            else {
                if (user.email_verified_at === undefined || user.email_verified_at === null) {
                    navigate("/verifyEmail")
                }
            }
        }
        setAuthorizeStorage(user.available_space)
        setVerificationCompleted(true);
    }, [])

    useEffect(() => {
        if (verificationCompleted) {
            setIsLoadingVerifPage(false);
        }
    }, [verificationCompleted]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token")
        setIsLoading(true)
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
                Swal.fire(
                    result.error.message,
                    '',
                    'error'
                )
            }
            else if (result.paymentIntent.status === 'succeeded') {
                const response = await fetch("http://127.0.0.1:8000/api/confirm-payment", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                var user = JSON.parse(sessionStorage.getItem("user"))
                user.available_space = Number(user.available_space) + 20480
                sessionStorage.setItem("user", JSON.stringify(user))
                Swal.fire(
                    'Votre paiement a été accepté',
                    '',
                    'success'
                )
                navigate("/home")
            };
            setIsLoading(false)
        } catch (error){
            console.error('Error during paiement:', error);
        }
    }

    return (
        <>
            {isLoadingVerifPage ? (
                <div className="loader loaderPage">
                    <ClipLoader
                        color="#444444"
                        loading={isLoadingVerifPage}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    {AutorizeStorage > 0 ? (
                        <Navbar more={true}/>
                    ) : (
                        <Navbar />
                    )}
                    <section id="section-main">
                        {AutorizeStorage > 0 ? (
                            <>
                                <div id="menu-mobile">
                                    <MenuItem icon={cloud} text="Mon espace" route="/home" />
                                    <MenuItem icon={settings} text="Mon compte" route="/account" />
                                </div>
                                <div id="menu">
                                    <MenuItem icon={cloud} text="Mon espace" route="/home" />
                                    <MenuItem icon={settings} text="Mon compte" route="/account" />
                                </div>
                            </>
                            ) : (
                                <>
                                    <div id="menu-mobile">
                                        <MenuItem icon={settings} text="Mon compte" route="/account" />
                                    </div>
                                    <div id="menu">
                                        <MenuItem icon={settings} text="Mon compte" route="/account" />
                                    </div>
                                </>
                            )
                        }
                        <div id="main" className="notSpace">
                            <form id="stripe" onSubmit={handleOnSubmit}>
                                <h1>Achat de Stockage</h1>
                                <CardElement />
                                {isLoading ? (
                                    <div className="loader">
                                        <ClipLoader
                                            color="#444444"
                                            loading={isLoading}
                                            size={42.7}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    <button className="basic" type="submit">Acheter</button>
                                )}
                            </form>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default BuySpace