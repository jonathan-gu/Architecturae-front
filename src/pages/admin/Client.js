import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import File from "../../components/File/File";
import ClipLoader from "react-spinners/ClipLoader";

const AdminClient = () => {
    const id = useParams().id;

    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);
    const [files, setFiles] = useState([])
    const [filteredFiles, setFilteredFiles] = useState([])
    const [user, setUser] = useState([])

    const navigate = useNavigate()

    const [verificationCompleted, setVerificationCompleted] = useState(false)

    useEffect(() => {
        const getFiles = async () => {
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
            
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/admin/users/${id}/files`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                setFiles(responseData.files)
                setFilteredFiles(responseData.files)
                setUser(responseData.user)
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getFiles()
        setVerificationCompleted(true)
    }, [])

    useEffect(() => {
        if (verificationCompleted) {
            setIsLoadingVerifPage(false);
        }
    }, [verificationCompleted]);

    const handleOnFilter = (searchValue, newFile = null) => {
        if (searchValue === "") {
            setFilteredFiles(files)
        }
        else {
            const filtered = files.filter((file) =>
                file.file_name.toLowerCase().includes(searchValue.toLowerCase())
            )
            if (newFile !== null) {
                if(newFile.file_name.toLowerCase().includes(searchValue.toLowerCase())) {
                    filtered.push(newFile)
                }
            }
            setFilteredFiles(filtered)
        }
    }

    const handleOnSorting = (e) => {
        let sortedFiles = [...files]
        let sortedFilteredFiles = [...filteredFiles]
        if (e.target.value === "dateMore") {
            sortedFiles.sort((a, b) => new Date(b.added_at) - new Date(a.added_at));
            sortedFilteredFiles.sort((a, b) => new Date(b.added_at) - new Date(a.added_at));
        }
        else if (e.target.value === "dateLess") {
            sortedFiles.sort((a, b) => new Date(a.added_at) - new Date(b.added_at));
            sortedFilteredFiles.sort((a, b) => new Date(a.added_at) - new Date(b.added_at));
        }
        else if (e.target.value === "sizeMore") {
            sortedFiles.sort((a, b) => b.file_size - a.file_size)
            sortedFilteredFiles.sort((a, b) => b.file_size - a.file_size)
        }
        else if (e.target.value === "sizeLess") {
            sortedFiles.sort((a, b) => a.file_size - b.file_size)
            sortedFilteredFiles.sort((a, b) => a.file_size - b.file_size)
        }
        setFiles(sortedFiles)
        setFilteredFiles(sortedFilteredFiles)
    }

    const handleOnWrite = (e) => {
        handleOnFilter(e.target.value)
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
                    <Navbar more={true} items={[{name: "Clients", route: "/admin/clients"}, {name: "Tableau de bord", route: "/admin/statistics"}]} />
                    <div id="menu-admin">
                        <NavLink to="/admin/clients"><button>Clients</button></NavLink>
                        <NavLink to="/admin/statistics"><button>Tableau de bord</button></NavLink>
                    </div>
                    <div id="admin">
                        <div id="title">
                            <h1>Fichier de {user.first_name + " " + user.name}</h1>
                            <div>
                                <select onChange={handleOnSorting}>
                                    <option value="dateLess">Date (ancien)</option>
                                    <option value="dateMore">Date (récent)</option>
                                    <option value="sizeMore">Taille (Elevée)</option>
                                    <option value="sizeLess">Taille (Faible)</option>
                                </select>
                                <input id="search" type="text" placeholder="Rechercher" onChange={handleOnWrite}/>
                            </div>
                        </div>
                        {filteredFiles.map(file => (
                            <File key={file.id} id={file.id} name={file.file_name} files={files} setFiles={setFiles} type="admin" isDelete={false} />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default AdminClient