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
                console.log(responseData.allUsers)
                setUsers(responseData.allUsers)
            } catch (error) {
                console.error('Error during get:', error);
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
                    <Row key={user.user.id} id={user.user.id} lastName={user.user.name} firstName={user.user.first_name} adressMail={user.user.email} phoneNumber={user.user.phone_number} city={user.user.city} address={user.user.address} zipCode={user.user.postal_code} siretNumber={user.user.siret_number} available_space={user.user.available_space} user_total_file_size={user.user_total_file_size}  />
                ))}
            </tbody>
        </table>
    )
}

export default Table