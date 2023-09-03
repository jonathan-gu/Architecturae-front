import React from "react";
import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'
import "./row.css"

const Row = ({ lastName, firstName, adressMail, phoneNumber, adress, city, zipCode, siretNumber = "" }) => {
    const handleOnClick = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Informations client',
            icon: 'success',
            html: `
                <div class="div-popup"><p class="p-popup">Nom</p><p class="p-popup">${lastName}</p></div>
                <div class="div-popup"><p class="p-popup">Prénom</p><p class="p-popup">${firstName}</p></div>
                <div class="div-popup"><p class="p-popup">Mail</p><p class="p-popup">${adressMail}</p></div>
                <div class="div-popup"><p class="p-popup">N° téléphone</p><p class="p-popup">${phoneNumber}</p></div>
                <div class="div-popup"><p class="p-popup">Adresse</p><p class="p-popup">${adress}</p></div>
                <div class="div-popup"><p class="p-popup">Ville</p><p class="p-popup">${city}</p></div>
                <div class="div-popup"><p class="p-popup">Code postal</p><p class="p-popup">${zipCode}</p></div>
                <div class="div-popup"><p class="p-popup">Numéro de Siret</p><p class="p-popup">${siretNumber}</p></div>`
        }
            
        )
    }

    return (
        <>
            <tr>
                <NavLink to="/admin/client">
                    <td className="width1">{lastName}</td>
                    <td className="width1">{firstName}</td>
                    <td className="width3">{adressMail}</td>
                    <td className="width1">{phoneNumber}</td>
                    <td className="width3">{adress}</td>
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