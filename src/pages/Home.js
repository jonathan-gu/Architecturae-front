import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MenuItem from "../components/MenuItem/MenuItem";
import File from "../components/File/File";
import Footer from "../components/Footer/Footer";
import settings from "../assets/icons/settings.svg";
import cloud from "../assets/icons/cloud-outline.svg";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
    const [isLoadingVerifPage, setIsLoadingVerifPage] = useState(true);

    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState("");
    const [files, setFiles] = useState([])
    const [filteredFiles, setFilteredFiles] = useState([])
    const [AutorizeStorage, setAuthorizeStorage] = useState(0)
    const [verificationCompleted, setVerificationCompleted] = useState(false)

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
                if (user.email_verified_at === undefined || user.email_verified_at === null) {
                    navigate("/verifyEmail")
                }
                if (Number(user.available_space) === 0) {
                    navigate("/buySpace")
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
        setVerificationCompleted(true);
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

    const handleOnChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleOnWrite = (e) => {
        handleOnFilter(e.target.value)
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
                handleOnFilter(document.getElementById("search").value, responseData.file)
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
                            <form className="form-main" id="add-file" onSubmit={handleOnSubmit}>
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
            )}
        </>
    )
}

export default Home