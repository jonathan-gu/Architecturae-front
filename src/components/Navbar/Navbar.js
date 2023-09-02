import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logout from "../../assets/icons/log-off.svg";

const Navbar = ({ isLogin = true, more = false, items = [] }) => {
    return (
        <>
            <nav className={more ? "more" : ""}>
                <h1>ARCHITECTURAE</h1>
                {isLogin && <>
                    <img src={logout} />
                    <div id="buttons">
                        {items.map((item, index) => {
                            return(
                                <NavLink key={index} to={item.route}><button>{item.name}</button></NavLink>
                            )
                        })}
                        <button>Deconnexion</button>
                    </div>
                </>}
            </nav>
        </>

        
    )
}

export default Navbar