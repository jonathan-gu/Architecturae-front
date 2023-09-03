import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import File from "../../components/File/File";

const AdminClient = () => {
    const id = useParams().id;

    const [files, setFiles] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        const getFiles = async () => {
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
                console.log(responseData)
                setFiles(responseData.files)
                setUser(responseData.user)
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
        getFiles()
    }, [])

    return (
        <>
        <Navbar more={true} items={[{name: "Clients", route: "/admin/clients"}, {name: "Tableau de bord", route: "/admin/statistics"}]} />
            <div id="menu-admin">
                <NavLink to="/admin/clients"><button>Clients</button></NavLink>
                <NavLink to="/admin/statistics"><button>Tableau de bord</button></NavLink>
            </div>
            <div id="admin">
                <div id="title">
                    <h1>Fichier de {user.first_name + " " + user.name}</h1>
                    <input type="text" placeholder="Rechercher" />
                </div>
                {files.map(file => (
                    <File key={file.id} id={file.id} name={file.file_name} files={files} setFiles={setFiles} role="admin" />
                ))}
            </div>
        </>
    )
}

export default AdminClient