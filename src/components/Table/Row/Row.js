import React from "react";
import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'
import "./row.css"

const Row = ({ id, lastName, firstName, adressMail, phoneNumber, address, city, zipCode, siretNumber = "", available_space, user_total_file_size }) => {
    const handleOnClick = (e) => {
        console.log(user_total_file_size)
        e.preventDefault()
        Swal.fire({
            title: 'Informations client',
            icon: 'success',
            html: `
                <div class="div-popup"><p class="p-popup">Nom</p><p class="p-popup">${lastName}</p></div>
                <div class="div-popup"><p class="p-popup">Prénom</p><p class="p-popup">${firstName}</p></div>
                <div class="div-popup"><p class="p-popup">Mail</p><p class="p-popup">${adressMail}</p></div>
                <div class="div-popup"><p class="p-popup">N° téléphone</p><p class="p-popup">${phoneNumber}</p></div>
                <div class="div-popup"><p class="p-popup">Adresse</p><p class="p-popup">${address}</p></div>
                <div class="div-popup"><p class="p-popup">Ville</p><p class="p-popup">${city}</p></div>
                <div class="div-popup"><p class="p-popup">Code postal</p><p class="p-popup">${zipCode}</p></div>
                <div class="div-popup"><p class="p-popup">Numéro de Siret</p><p class="p-popup">${siretNumber}</p></div>
                <div class="div-popup"><p class="p-popup">Stockage</p><p class="p-popup">${(user_total_file_size / 1073741824).toFixed(2)} Go / ${available_space / 1024} Go</p></div>`
        }
            
        )
    }

    return (
        <>
            <tr>
                <NavLink to={`/admin/client/${id}`}>
                    <td className="width1">{lastName}</td>
                    <td className="width1">{firstName}</td>
                    <td className="width3">{adressMail}</td>
                    <td className="width1">{phoneNumber}</td>
                    <td className="width3">{address}</td>
                    <td className="width1">{city}</td>
                    <td className="width1">{zipCode}</td>
                    <td className="width3">{siretNumber}</td>
                </NavLink>
                <td id="more" onClick={handleOnClick}>...</td>
            </tr>
        </>
    )
}

export default Row