import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import MenuItem from "../../components/MenuItem/MenuItem";
import Table from "../../components/Table/Table";
import cloud from "../../assets/icons/cloud-outline.svg"
import { ClipLoader } from "react-spinners";

const AdminClients = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const navigate = useNavigate()

    const [verificationCompleted, setVerificationCompleted] = useState(false)

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (user === null) {
            navigate("/login")
        }
        else {
            if (user.role === 'user') {
                if (user.email_verified_at === undefined || user.email_verified_at === null) {
                    navigate("/verifyEmail")
                }
                else {
                    navigate("/home")
                }
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
                    <Navbar more={true} items={[{name: "Clients", route: "/admin/clients"}, {name: "Tableau de bord", route: "/admin/statistics"}]} />
                    <div id="menu-admin">
                        <NavLink to="/admin/clients"><button>Clients</button></NavLink>
                        <NavLink to="/admin/statistics"><button>Tableau de bord</button></NavLink>
                    </div>
                    <Table />
                </>
            )}
        </>
    )
}

export default AdminClients