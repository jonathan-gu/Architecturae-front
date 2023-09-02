import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Swal from 'sweetalert2'
import MenuItem from "../components/MenuItem/MenuItem";
import File from "../components/File/File";
import Footer from "../components/Footer/Footer";
import cloud from "../assets/icons/cloud-outline.svg";

const Account = () => {
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
        var user = sessionStorage.getItem("user")
        if (user === null) {
            navigate("/login")
        }
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const handleOnClick = (action) => (e) => {
        e.preventDefault()
        if (action === "delete") {

            Swal.fire(
                'Votre compte à bien été supprimé',
                '',
                'success'
            )
            navigate("/")
        }
        else {
            Swal.fire(
                'Votre compte à bien été modifié',
                '',
                'success'
            )
        }
    }

    return (
        <>
            <Navbar />
            <section id="section-main">
                <div id="menu-mobile">
                    <MenuItem icon={cloud} text="Mon espace" route="/home" />
                </div>
                <div id="menu">
                    <MenuItem icon={cloud} text="Mon espace" route="/home" />
                </div>
                <div id="main">
                    <h1 id="first-title">Mon Profil</h1>
                    <form onSubmit={handleOnSubmit}>
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
                        <div id="buttons">
                            <button className="basic" type="submit" onClick={handleOnClick("update")}>Modifier</button>
                            <button className="bad" type="submit" onClick={handleOnClick("delete")}>Supprimer mon compte</button>
                        </div>
                    </form>
                    <div id="title" className="not-first-title">
                        <h1>Mes factures</h1>
                        <input type="text" placeholder="Rechercher" />
                    </div>
                    <File name="Facture 1" />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Account