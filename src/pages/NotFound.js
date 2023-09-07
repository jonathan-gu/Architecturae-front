import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const NotFound = () => {
    return (
        <>
            <Navbar isLogin={false} />
            <h1 id="not">Erreur 404 Page non trouvé</h1>
            <Footer />
        </>
    )
}

export default NotFound