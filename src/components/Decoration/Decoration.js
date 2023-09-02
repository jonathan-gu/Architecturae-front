import React from "react";
import "./decoration.css";

const Decoration = ({ firstImage, secondImage }) => {
    return (
        <div className="decoration">
            <div className="top-image">
                <img src={firstImage} />
            </div>
            <div className="bottom-image">
                <img src={secondImage} />
            </div>
        </div>
    )
}

export default Decoration