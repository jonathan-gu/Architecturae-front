import React from "react"
import "./file.css"
import trash from "../../assets/icons/trash.svg";
import download from "../../assets/icons/download.svg";
import Swal from "sweetalert2";

function File({ name, files, setFiles, setFilteredFiles, id, role, isDelete = true }) {
    var token = sessionStorage.getItem("token");
    const handleOnDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/files/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setFiles(files.filter(file => file.id !== id));
                setFilteredFiles(files.filter(file => file.id !== id));
                Swal.fire(
                    'Votre fichier a bien été supprimé',
                    '',
                    'success'
                );
            } else {
                console.error('Upload failed:', response.statusText);
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
        try {
            var url = "";
            if (role === "user") {
                url = `http://127.0.0.1:8000/api/files/${id}`;
            }
            else {
                url = `http://127.0.0.1:8000/api/admin/users/files/${id}`;
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
                Swal.fire(
                    'Votre fichier a bien été téléchargé',
                    '',
                    'success'
                );
            } else {
                console.error('Upload failed:', response.statusText);
                Swal.fire(
                    'Le téléchargement du fichier a échoué',
                    '',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error during uploaded:', error);
        }
    };

    return (
        <div className="file">
            <p>{name}</p>
            <div className="actions">
                {isDelete && <img src={trash} onClick={handleOnDelete} />}
                <img src={download} onClick={handleOnDownload} />
            </div>
        </div>
    );
}

export default File