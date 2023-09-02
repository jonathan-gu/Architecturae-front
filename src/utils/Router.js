import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Login from "../pages/Login";
import Account from "../pages/Account";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Account" element={<Account />} />
        </Routes>
    )
}

export default Router