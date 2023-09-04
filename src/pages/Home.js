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
    const [filteredFiles, setFilteredFiles] = useState([])
    const [storage, setStorage] = useState(0)

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

        const token = sessionStorage.getItem("token")
        const getFiles = async () => {
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
                if (responseData.files !== null) {
                    setFiles(responseData.files)
                    setFilteredFiles(responseData.files)
                }
            } catch (error) {
                console.error('Error during get:', error);
            }
        }
        getFiles()
        // const getStorage = async () => {
        //     try {
        //         const response = await fetch(`http://127.0.0.1:8000/api/users/storage/size`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Accept': 'application/json',
        //                 'Authorization': `Bearer ${token}`
        //             },
        //         });
        //         const responseData = await response.json();
        //         console.log(responseData)
        //         // setFiles(responseData.files)
        //     } catch (error) {
        //         console.error('Error during get:', error);
        //     }
        // }
        // getStorage()
    }, [])

    const handleOnChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleOnWrite = (e) => {
        console.log(e.target.value)
        if (e.target.value === "") {
            setFilteredFiles(files)
        }
        else {
            const filtered = files.filter((file) =>
                file.file_name.toLowerCase().includes(e.target.value.toLowerCase())
            )
            setFilteredFiles(filtered)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        console.log(selectedFile)
        if (!selectedFile) {
            Swal.fire(
                'Veuillez selectionné un fichier',
                '',
                'error'
            )
            return
        }

        const token = sessionStorage.getItem("token")
        var formData = new FormData();
        formData.append("file", selectedFile)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setFiles([responseData.file, ...files]);
                setSelectedFile("")
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
                        <input type="text" placeholder="Rechercher" onChange={handleOnWrite}/>
                    </div>
                    <form id="add-file" onSubmit={handleOnSubmit}>
                        <input type="file" onChange={handleOnChange}/>
                        <button type="submit">Ajouter</button>
                    </form>
                    {filteredFiles.map(file => (
                        <File key={file.id} id={file.id} name={file.file_name} files={files} setFiles={setFiles} setFilteredFiles={setFilteredFiles} role="user" />
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home