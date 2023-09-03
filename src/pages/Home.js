import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MenuItem from "../components/MenuItem/MenuItem";
import File from "../components/File/File";
import Footer from "../components/Footer/Footer";
import settings from "../assets/icons/settings.svg";
import cloud from "../assets/icons/cloud-outline.svg";

const Home = () => {
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
                if (user.email_verified_at === undefined) {
                    navigate("/verifyEmail")
                }
            }
        }
    }, [])

    return (
        <>
            <Navbar more={true} />
            <section id="section-main">
                <div id="menu-mobile">
                    <MenuItem icon={settings} text="Mon compte" route="/account" />
                    <div className="spaces">
                        <MenuItem icon={cloud} text="Acheter de l'espace" route="/buySpace" />
                        <p className="space">0 Go / 20 Go</p>
                    </div>
                </div>
                <div id="menu">
                    <MenuItem icon={settings} text="Mon compte" route="/account" />
                    <MenuItem icon={cloud} text="Acheter de l'espace" route="/buySpace" />
                    <p className="space">0 Go / 20 Go</p>
                </div>
                <div id="main">
                    <div id="title">
                        <h1>Mes fichiers</h1>
                        <input type="text" placeholder="Rechercher" />
                    </div>
                    <File name="Fichier 1" />
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home