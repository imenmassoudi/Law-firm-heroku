import React, { Component } from 'react'
import {Link} from "react-router-dom";
const Menu = () => {
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Avocats</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2"
                                 alt="User Image"/>
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">{localStorage.getItem("user")}</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-header">Gestion des utilisateurs</li>
                            <li className="nav-item">
                                <Link to="/user" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>Utilisateurs</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-building"></i>
                                    <p>
                                        Liste des tribunaux   <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/tribunaux" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Tribunaux</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/services" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Services</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>

    )
}
export default Menu