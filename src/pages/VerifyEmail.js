import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const VerifyEmail = () => {
    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        if (user === null) {
            navigate("/login")
        }
        else {
            if (user.role == "admin") {
                navigate("/users/clients")
            }
            const getEmailVerified = async () => {
                const token = sessionStorage.getItem("token")
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/user/email-verification-date', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData.email_verified_at !== null) {
                        user.email_verified_at = responseData[0]
                        sessionStorage.setItem("user", JSON.stringify(user))
                        navigate("/home")
                    }
                } catch (error) {
                    console.error('Error during registration:', error);
                }
            }
            if (user.email_verified_at === undefined || user.email_verified_at === null) {
                getEmailVerified()
            }
            else {
                navigate("/home")
            }
        }
    }, [])


    return (
        <>
            <Navbar />
            <section id="not">
                <h1>Verification d'email</h1>
                <p>Veuillez vérifier votre pour accéder à votre espace</p>
            </section>
            <Footer />
        </>
    )
}

export default VerifyEmail