import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
        </Routes>
    )
}

export default Router