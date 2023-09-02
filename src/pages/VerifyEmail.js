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
            if (user.email_verified_at !== undefined) {
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