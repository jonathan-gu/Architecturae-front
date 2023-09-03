import React from "react";
import "./statistic.css"

const Statistic = ({ name, number, type = "client" }) => {
    const typeDiv = type === "total" || type === "day" ? `statistic ${type}` : "statistic"

    return (
        <div className={typeDiv}>
            <p>{name}</p>
            <p>{number}</p>
        </div>
    )
}

export default Statistic