import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import logout from "../../assets/icons/log-off.svg";

const Navbar = ({ isLogin = true, more = false, items = [] }) => {
    const navigate = useNavigate()

    const handleOnCLick = async () => {
        const token = sessionStorage.getItem("token")

        try {
            console.log(token)
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const responseData = await response.json();
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("dateConnection")
                navigate("/login")
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    } 

    return (
        <>
            <nav className={more ? "more" : ""}>
                <h1>ARCHITECTURAE</h1>
                {isLogin && <>
                    <img className="logout" src={logout} onClick={handleOnCLick}/>
                    <div id="buttons">
                        {items.map((item, index) => {
                            return(
                                <NavLink key={index} to={item.route}><button>{item.name}</button></NavLink>
                            )
                        })}
                        <button className="logout" onClick={handleOnCLick}>Deconnexion</button>
                    </div>
                </>}
            </nav>
        </>

        
    )
}

export default Navbar