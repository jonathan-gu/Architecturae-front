import React from "react";
import { NavLink } from "react-router-dom";
import "./menuitem.css";


const MenuItem = ({ icon, text, route }) => {
    return (
        <NavLink to={route} className="menu-item">
            <img src={icon} />
            <p>{text}</p>
        </NavLink>
    );
};

export default MenuItem