import React, { Component } from 'react'
import {Link, useHistory} from "react-router-dom";

const Menu = () => {
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login')

    }

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-2  " id="control-sidebar">
                {/* Brand Logo */}
                <div to="#" className="brand-link" style={{}}>
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Avocats
                        <a className="nav-link" data-widget="pushmenu" href="#" style={{float:"right",color:"white"}}><i className="fas fa-arrow-alt-circle-left" /></a>
                </span>
                </div>


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
                            {/*<li className="nav-item">*/}
                            {/*    <a href="#" className="nav-link">*/}
                            {/*        <i className="nav-icon fas fa-tachometer-alt"></i>*/}
                            {/*        <p>*/}
                            {/*            Paramétre*/}
                            {/*            <i className="right fas fa-angle-left"></i>*/}
                            {/*        </p>*/}
                            {/*    </a>*/}
                            {/*    <ul className="nav nav-treeview">*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to='/param_global' className='nav-link'>*/}
                            {/*                <i className='nav-icon fas fa-cogs'></i>*/}
                            {/*                <p>Paramétre globale</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to='/honoraire_extra' className='nav-link'>*/}
                            {/*                <i className='nav-icon fas fa-sliders-h'></i>*/}
                            {/*                <p>Honoraire en extra</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <a href="#" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-circle"></i>*/}
                            {/*                <p>*/}
                            {/*                    Debours*/}
                            {/*                    <i className="right fas fa-angle-left"></i>*/}
                            {/*                </p>*/}
                            {/*            </a>*/}
                            {/*            <ul className="nav nav-treeview">*/}
                            {/*                <li className="nav-item">*/}
                            {/*                    <Link to='/timbre' className='nav-link'>*/}
                            {/*                        <i className='nav-icon fas fa-mail-bulk'></i>*/}
                            {/*                        <p>Timbre</p>*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*                <li className="nav-item">*/}
                            {/*                    <Link to='/recette_finance' className='nav-link'>*/}
                            {/*                        <i className='nav-icon fas fa-file-invoice-dollar'></i>*/}
                            {/*                        <p>Recette de finance</p>*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/emplacement" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-question-circle" />*/}
                            {/*                <p>Emplacement dossier</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/tribunaux" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-building"></i>*/}
                            {/*                <p>Tribunaux</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/typedossier" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-file" />*/}
                            {/*                <p>Type dossier</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/user" className="nav-link">*/}
                            {/*                <i className="nav-icon fa fa-user" />*/}
                            {/*                <p>Utilisateurs</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/collaborateur" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-edit" />*/}
                            {/*                <p>Collaborateurs</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/greffier" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-cogs" />*/}
                            {/*                <p>Greffiers</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/primegreffier" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-edit" />*/}
                            {/*                <p>Primes greffiers</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link to="/user" className="nav-link">
                                    <i className="nav-icon fa fa-user" />
                                    <p>Users</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/clients" className="nav-link">
                                    <i className="nav-icon fa fa-user-friends" />
                                    <p>Clients</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dossiersList" className="nav-link">
                                    <i className="nav-icon fa fa-file" />
                                    <p>Dossiers</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a onClick={logout} className="nav-link">
                                    <i className="nav-icon fas fa-sign-out-alt" />
                                    <p  >Se déconnecter</p>
                                </a>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a href="#" className="nav-link">*/}
                            {/*        <i className="nav-icon fas fa-file"></i>*/}
                            {/*        <p>*/}
                            {/*            Dossiers*/}
                            {/*            <i className="right fas fa-angle-left"></i>*/}
                            {/*        </p>*/}
                            {/*    </a>*/}
                            {/*    <ul className="nav nav-treeview">*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/dossiersList" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-archive" />*/}
                            {/*                <p>Tous les dossiers</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/dossier" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-edit" />*/}
                            {/*                <p>Créer dossier</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}

                            {/*        <li className="nav-item">*/}
                            {/*            <Link to="/emplacement" className="nav-link">*/}
                            {/*                <i className="nav-icon fas fa-question-circle" />*/}
                            {/*                <p>emplacement dossier</p>*/}
                            {/*            </Link>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}

                                
                          
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