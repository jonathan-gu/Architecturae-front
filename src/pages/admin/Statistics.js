import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Statistic from "../../components/Statistic/Statistic";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AdminStatistics = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);

    const [total_uploaded_files, setTotal_uploaded_files] = useState(null)
    const [today_uploaded_files, setToday_uploaded_files] = useState(null)
    const [files_per_client, setFiles_per_client] = useState([])
    const [verificationCompleted, setVerificationCompleted] = useState(false)

    const navigate = useNavigate()

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

        const getNumberTotalFiles = async () => {
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/total-uploaded-files-count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                setTotal_uploaded_files(responseData.total_uploaded_files)
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getNumberTotalFiles()
        const getNumberTodayFiles = async () => {
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/uploaded-files-today-count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                setToday_uploaded_files(responseData.uploaded_files_today)
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getNumberTodayFiles()
        const getFilesPerClient = async () => {
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/files-per-client', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                const transformedArray = Object.entries(responseData.files_per_client).map(([name, numberFiles]) => ({
                    name: name,
                    numberFiles: numberFiles
                }));
                setFiles_per_client(transformedArray)
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getFilesPerClient()
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
                    <section id="admin">
                        <div className="statistics">
                            <Statistic name="Fichiers téléchargés" number={total_uploaded_files} type="total" />
                            <Statistic name="Fichiers téléchargés aujourd'hui" number={today_uploaded_files} type="day" />
                        </div>
                        <div className="statistics">
                            {files_per_client.map(client => (
                                <Statistic name={client.name} number={client.numberFiles} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default AdminStatistics