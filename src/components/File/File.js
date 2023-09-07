import React, { useState } from "react"
import "./file.css"
import trash from "../../assets/icons/trash.svg";
import download from "../../assets/icons/download.svg";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

function File({ name, files = null, setFiles = null, setFilteredFiles = null, id, type, isDelete = true }) {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoadingDownload, setIsLoadingDownload] = useState(false)

    var token = sessionStorage.getItem("token");
    const handleOnDelete = async () => {
        setIsLoadingDelete(true)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const responseData = await response.json();
                if (files !== null && setFiles != null && setFilteredFiles !== null) {
                    setFiles(files.filter(file => file.id !== id));
                    setFilteredFiles(files.filter(file => file.id !== id));
                }
                setIsLoadingDelete(false)
                Swal.fire(
                    'Votre fichier a bien été supprimé',
                    '',
                    'success'
                );
            } else {
                console.error('Upload failed:', response.statusText);
                setIsLoadingDelete(false)
                Swal.fire(
                    'La suppression du fichier a échoué',
                    '',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error during uploaded:', error);
        }
    };

    const handleOnDownload = async () => {
        setIsLoadingDownload(true)
        try {
            var url = "";
            if (type === "user") {
                url = `http://127.0.0.1:8000/api/files/${id}`;
            }
            else if (type === "admin") {
                url = `http://127.0.0.1:8000/api/admin/users/files/${id}`;
            }
            else {
                url = `http://127.0.0.1:8000/api/user/invoice/${id}`
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                setIsLoadingDownload(false)
                if (type === 'invoice') {
                    Swal.fire(
                        'Votre facture a bien été téléchargé',
                        '',
                        'success'
                    )
                }
                else {
                    Swal.fire(
                        'Votre fichier a bien été téléchargé',
                        '',
                        'success'
                    );
                }
            } else {
                console.error('Upload failed:', response.statusText);
                setIsLoadingDownload(false)
                Swal.fire(
                    'Le téléchargement du fichier a échoué',
                    '',
                    'error'
                );
            }
        } catch (error) {
            setIsLoadingDownload(false)
            console.error('Error during downloaded:', error);
        }
    };

    return (
        <div className="file">
            <p>{name}</p>
            <div className="actions">
                
                {isDelete ?
                    isLoadingDelete ? (
                        <div className="loader">
                            <ClipLoader
                                color="#444444"
                                loading={isLoadingDelete}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : (
                        <img src={trash} onClick={handleOnDelete} />
                    ) :
                        <></>
                }
                {isLoadingDownload ? (
                    <div className="loader">
                        <ClipLoader
                            color="#444444"
                            loading={isLoadingDownload}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <img src={download} onClick={handleOnDownload} />
                )}
            </div>
        </div>
    );
}

export default File