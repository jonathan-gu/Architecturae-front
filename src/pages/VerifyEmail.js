import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ClipLoader from "react-spinners/ClipLoader";

const VerifyEmail = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const [verificationCompleted, setVerificationCompleted] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        if (user === null) {
            navigate("/login")
        }
        else {
            if (user.role === "admin") {
                navigate("/admin/clients")
            }
            const getEmailVerified = async () => {
                const token = sessionStorage.getItem("token")
                try {
                    console.log(1)
                    const response = await fetch('http://127.0.0.1:8000/api/user/email-verification-date', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const responseData = await response.json();
                    console.log(responseData[0])
                    if (responseData[0] !== null) {
                        user.email_verified_at = responseData[0]
                        sessionStorage.setItem("user", JSON.stringify(user))
                        navigate("/home")
                    }
                } catch (error) {
                    console.error('Error during get:', error);
                }
            }
            if (user.email_verified_at === undefined || user.email_verified_at === null) {
                getEmailVerified()
            }
            else {
                navigate("/home")
            }
        }
        setVerificationCompleted(true);
    }, [])

    useEffect(() => {
        if (verificationCompleted) {
            setIsLoadingVerifPage(false);
        }
    }, [verificationCompleted]);

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
                    <Navbar />
                    <section id="not">
                        <h1>Verification d'email</h1>
                        <p>Veuillez vérifier votre pour accéder à votre espace</p>
                    </section>
                    <Footer />
                </>
            )}
        </>
    )
}

export default VerifyEmail