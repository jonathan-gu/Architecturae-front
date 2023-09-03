import React, { useState, useEffect } from "react";
import Row from "./Row/Row"
import "./table.css"

const Table = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const token = sessionStorage.getItem("token")
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                console.log(responseData)
                setUsers(responseData.users)
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
        getUsers()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th className="width1">Nom</th>
                    <th className="width1">Prénom</th>
                    <th className="width3">Adresse mail</th>
                    <th className="width1">N° téléphone</th>
                    <th className="width3">Adresse</th>
                    <th className="width1">Ville</th>
                    <th className="width1">Code Postal</th>
                    <th className="width3">Numéro de Siret</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <Row lastName={user.name} firstName={user.first_name} adressMail={user.email} phoneNumber={user.phone_number} adress={user.adress} zipCode={user.postal_code} siretNumber={user.siret_number}/>
                ))}
            </tbody>
        </table>
    )
}

export default Table