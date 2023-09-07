import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Swal from 'sweetalert2'
import MenuItem from "../components/MenuItem/MenuItem";
import File from "../components/File/File";
import Footer from "../components/Footer/Footer";
import cloud from "../assets/icons/cloud-outline.svg";
import buy from "../assets/icons/buy.svg"
import ClipLoader from "react-spinners/ClipLoader";

const Account = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const [verificationCompleted, setVerificationCompleted] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false)
    const [isLoadingUpdateAccount, setIsLoadingUpdateAccount] = useState(false)

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
    
    const [user, setUser] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        var user = JSON.parse(sessionStorage.getItem("user"))
        setUser(user)
        if (user === null) {
            navigate("/login")
        }
        else {
            if (user.role === 'admin') {
                navigate("/admin/clients")
            }
            else {
                if (user.email_verified_at === undefined) {
                    navigate("/verifyEmail")
                }
            }
        }

        const token = sessionStorage.getItem("token")
        const getInvoices = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/invoices', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                if (responseData.invoices !== null) {
                    setInvoices(responseData.invoices)
                }
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getInvoices()
        setVerificationCompleted(true);
    }, [])

    useEffect(() => {
        if (verificationCompleted) {
            setIsLoadingVerifPage(false);
        }
    }, [verificationCompleted]);

    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const handleOnClick = (action) => async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem("token")
        if (action === "delete") {
            setIsLoadingDeleteAccount(true)
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.status === 200) {
                    const responseData = await response.json();
                    sessionStorage.removeItem("user")
                    sessionStorage.removeItem("dateConnection")
                    sessionStorage.removeItem("token")
                    setIsLoadingDeleteAccount(false)
                    Swal.fire(
                        'Votre compte à bien été supprimé',
                        '',
                        'success'
                    )
                    navigate("/login")
                } else {
                    console.error('delete failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during deleted:', error);
            }
        }
        else {
            setIsLoadingUpdateAccount(true)
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
            };

            var formDataFiltered = {}

            for (const key in formData) {
                if (formData[key].length > 0) {
                    formDataFiltered[key] = formData[key];
                }
            }
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formDataFiltered)
                });
                if (response.status === 200) {
                    const responseData = await response.json();
                    setIsLoadingUpdateAccount(false)
                    Swal.fire(
                        'Votre compte à bien été modifié',
                        '',
                        'success'
                    )       
                } else {
                    setIsLoadingUpdateAccount(false)
                    console.error('update failed:', response.statusText);
                    Swal.fire(
                        'Le formulaire n\'est pas correctement remplis',
                        '',
                        'error'
                    )
                }
            } catch (error) {
                console.error('Error during updated:', error);
            }
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
                    <Navbar more="true" />
                    <section id="section-main">
                        <div id="menu-mobile">
                            <MenuItem icon={cloud} text="Mon espace" route="/home" />
                            {user.available_space > 0 &&
                                <MenuItem icon={buy} text="Acheter de l'espace" route="/buySpace" />
                            }
                        </div>
                        <div id="menu">
                            <MenuItem icon={cloud} text="Mon espace" route="/home" />
                            {user.available_space > 0 &&
                                <MenuItem icon={buy} text="Acheter de l'espace" route="/buySpace" />
                            }
                        </div>
                        <div id="main">
                            <h1 id="first-title">Mon Profil</h1>
                            <form className="form-account" onSubmit={handleOnSubmit}>
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
                                        {isLoadingUpdateAccount ? (
                                            <div className="loader button-simulated">
                                                <ClipLoader
                                                    color="#444444"
                                                    loading={isLoadingUpdateAccount}
                                                    size={40}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                            </div>
                                        ) : (
                                            <button className="basic" type="submit" onClick={handleOnClick("update")}>Modifier</button>
                                        )}
                                        {isLoadingDeleteAccount ? (
                                            <div className="loader button-simulated">
                                                <ClipLoader
                                                    color="#444444"
                                                    loading={isLoadingDeleteAccount}
                                                    size={40}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                            </div>
                                        ) : (
                                            <button className="bad" type="submit" onClick={handleOnClick("delete")}>Supprimer mon compte</button>
                                        )}
                                </div>
                            </form>
                            <div id="title" className="not-first-title">
                                {invoices.length > 0 &&
                                    <h1>Mes factures</h1>
                                }
                            </div>
                            {invoices.map(invoice => (
                                <File key={invoice.id} id={invoice.id} name={invoice.pdf_file_name} type="invoice" isDelete={false} />
                            ))}
                        </div>
                    </section>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Account