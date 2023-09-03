import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MenuItem from "../components/MenuItem/MenuItem";
import File from "../components/File/File";
import Footer from "../components/Footer/Footer";
import settings from "../assets/icons/settings.svg";
import cloud from "../assets/icons/cloud-outline.svg";
import Swal from "sweetalert2";

const Home = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState("");
    const [files, setFiles] = useState([])

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

        const getFiles = async () => {
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch('http://127.0.0.1:8000/api/files', {
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
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
        getFiles()
    }, [])

    const handleOnChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (!selectedFile) {
            Swal.fire(
                'Veuillez selectionné un fichier',
                '',
                'error'
            )
            return
        }

        var formData = new FormData();
        formData.append("file", selectedFile)
        var token = sessionStorage.getItem("token")
        try {
            const response = await fetch('http://127.0.0.1:8000/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            console.log(response)
            if (response.status === 200) {
                const responseData = await response.json();
                setFiles([...files, responseData.file]);
                Swal.fire(
                    'Votre fichier a bien été ajouté',
                    '',
                    'success'
                )
            } else {
                console.error('Upload failed:', response.statusText);
                Swal.fire(
                    'L\'ajout du fichier a échoué',
                    '',
                    'error'
                )   
            }
        } catch (error) {
            console.error('Error during uploaded:', error);
        }
    }

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
                    <form id="add-file" onSubmit={handleOnSubmit}>
                        <input type="file" onChange={handleOnChange} />
                        <button type="submit">Ajouter</button>
                    </form>
                    {files.map(file => (
                        <File name={file.file_name} />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home