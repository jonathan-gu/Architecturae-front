import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Account from "../pages/Account";
import AdminClients from "../pages/admin/Clients";
import AdminStatistics from "../pages/admin/Statistics";
import AdminClient from "../pages/admin/Client";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/client/:id" element={<AdminClient />} />
            <Route path="/admin/statistics" element={<AdminStatistics />} />
        </Routes>
    )
}

export default Router