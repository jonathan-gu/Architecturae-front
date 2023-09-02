import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Decoration from "../components/Decoration/Decoration";
import Footer from "../components/Footer/Footer";
import firstImage from "../assets/images/third-image.jpg";
import secondImage from "../assets/images/fourth-image.jpg";
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        if (user !== null) {
            if (user.role === 'admin') {
                navigate("/admin/users")
            }
            else {
                if (user.email_verified_at === undefined) {
                    navigate("/verifyEmail")
                }
                else {
                    navigate("/home")
                }
            }
        }
    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response)
            if (response.status === 200) {
                const responseData = await response.json();
                sessionStorage.setItem("token", responseData.token)
                sessionStorage.setItem("user", JSON.stringify(responseData.user))
                sessionStorage.setItem("dateConnection", new Date())
                if (responseData.user.role === "user") {
                    navigate("/home")
                }
                else if (responseData.user.role === "admin") {
                    navigate('/admin/users')
                }
            } else {
                console.error('Login failed:', response.statusText);
                Swal.fire(
                    'La connexion a échouée',
                    '',
                    'error'
                )   
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire(
                'La connexion a échouée',
                '',
                'error'
            )   
        }
    }

    return (
        <>
            <Navbar isLogin={false} />
            <section id="section-form">
                <Decoration firstImage={firstImage} secondImage={secondImage} />
                <form onSubmit={handleOnSubmit}>
                    <h1>Connexion</h1>
                    <div id="fields">
                        <div className="duo">
                            <div className="field">
                                <div className="label">
                                    <label>Adresse mail</label>
                                </div>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="field">
                                <div className="label">
                                    <label>Mot de passe</label>
                                </div>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button className="basic" type="submit">Se connecter</button>
                    <div className="bottom-form">
                        <p>Vous n'avez pas de compte ? <NavLink to="/">Inscrivez-vous</NavLink></p>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    )
}

export default Login