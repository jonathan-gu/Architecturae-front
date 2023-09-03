import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Statistic from "../../components/Statistic/Statistic";
import { NavLink } from "react-router-dom";

const AdminStatistics = () => {
    return (
        <>
            <Navbar more={true} items={[{name: "Clients", route: "/admin/clients"}, {name: "Tableau de bord", route: "/admin/statistics"}]} />
            <div id="menu-admin">
                <NavLink to="/admin/clients"><button>Clients</button></NavLink>
                <NavLink to="/admin/statistics"><button>Tableau de bord</button></NavLink>
            </div>
            <section id="admin">
                <div className="statistics">
                    <Statistic name="Fichiers téléchargés" number="100" type="total" />
                    <Statistic name="Fichiers téléchargés aujourd'hui" number="10" type="day" />
                </div>
                <div className="statistics">
                    <Statistic name="ABC" number="36" />
                    <Statistic name="DEF" number="67" />
                    <Statistic name="ABC" number="36" />
                    <Statistic name="DEF" number="67" />
                    <Statistic name="ABC" number="36" />
                    <Statistic name="DEF" number="67" />
                    <Statistic name="ABC" number="36" />
                    <Statistic name="DEF" number="67" />
                    <Statistic name="ABC" number="36" />
                    <Statistic name="DEF" number="67" />
                </div>
            </section>
        </>
    )
}

export default AdminStatistics