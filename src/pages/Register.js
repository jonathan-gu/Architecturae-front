import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Decoration from "../components/Decoration/Decoration";
import Footer from "../components/Footer/Footer";
import firstImage from "../assets/images/first-image.jpg";
import secondImage from "../assets/images/second-image.jpg";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const Register = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [siretNumber, setSiretNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        if (user !== null) {
            if (user.role === 'admin') {
                navigate("/admin/clients")
            }
            else {
                if (user.email_verified_at === null || user.email_verified_at === undefined) {
                    navigate("/verifyEmail")
                }
                else {
                    navigate("/home")
                }
            }
        }
        setIsLoadingVerifPage(false)
    }, [])

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        const formData = {
            first_name: firstName,
            name: lastName,
            email: email,
            phone_number: phoneNumber,
            address: address,
            city: city,
            postal_code: zip,
            siret_number: siretNumber,
            password: password,
            password_confirmation: confirmPassword,
            available_space: 0,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 200) {
                Swal.fire(
                    'Votre compte a été crée',
                    '',
                    'success'
                )
                navigate("/login")
            } else {
                Swal.fire(
                    'Le formulaire est mal remplis',
                    '',
                    'error'
                );
                console.error('Registration failed:', response.statusText)
            }
        } catch (error) {
            Swal.fire(
                'Une erreur du serveur s\'est produite',
                '',
                'error'
            );
            console.error('Error during registration:', error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoadingVerifPage ? (
                <div className="loader">
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
                    <Navbar isLogin={false} />
                    <section id="section-form">
                        <Decoration firstImage={firstImage} secondImage={secondImage} />
                        <form onSubmit={handleOnSubmit}>
                            <h1>Inscription</h1>
                            <div id="fields">
                                <div className="duo">
                                    <div className="field">
                                        <div className="label">
                                            <label>Prénom</label>
                                        </div>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <div className="label">
                                            <label>Nom</label>
                                        </div>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="duo">
                                    <div className="field">
                                        <div className="label">
                                            <label>Adresse mail</label>
                                        </div>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <div className="label">
                                            <label>Numéro de téléphone</label>
                                        </div>
                                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="duo">
                                    <div className="field">
                                        <div className="label">
                                            <label>Adresse</label>
                                        </div>
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <div className="label">
                                            <label>Ville</label>
                                        </div>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                </div>
                                <div className="duo">
                                    <div className="field">
                                        <div className="label">
                                            <label>Code Postal</label>
                                        </div>
                                        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <div className="label">
                                            <label>Numéro de Siret</label>
                                        </div>
                                        <input type="text" value={siretNumber} onChange={(e) => setSiretNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="duo">
                                    <div className="field">
                                        <div className="label">
                                            <label>Mot de passe</label>
                                        </div>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="field">
                                        <div className="label">
                                            <label>Confirmation</label>
                                        </div>
                                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
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
                                <button className="basic" type="submit">S'inscrire</button>
                            )}
                            <div className="bottom-form">
                                <p>Vous avez un compte ? <NavLink to="/login">Connectez-vous</NavLink></p>
                            </div>
                        </form>
                    </section>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Register