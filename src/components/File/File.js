import React from "react"
import "./file.css"
import trash from "../../assets/icons/trash.svg";
import download from "../../assets/icons/download.svg";

const File = ({ name }) => {
    return (
        <div className="file">
            <p>{name}</p>
            <div className="actions">
                <img src={trash} />
                <img src={download} />
            </div>
        </div>
    )
}

export default File