import {Link, useHistory} from "react-router-dom";
import React from "react";

const Header = () => {
    const history = useHistory();
   const logout = () => {
        localStorage.removeItem('token');
       history.push('/login')

   }
    return (
        <div >
            <nav className="main-header navbar navbar-expand navbar-white navbar-light ">
                {/* Left navbar links */}


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item" style={{position:"relative"}}>
                            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
                        </li>



                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Paramètre
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to='/param_global'>Paramètre globale</Link>
                                <Link className="dropdown-item" to='/honoraire_extra' >Honoraire en extra</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to='/timbre' >Timbre</Link>
                                <Link className="dropdown-item"to='/recette_finance'>Recette de finance</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item"to='/emplacement'>Emplacement dossier</Link>
                                <Link className="dropdown-item"to='/tribunaux'>Tribunaux</Link>
                                <Link className="dropdown-item"to='/typedossier'>Type dossier</Link>
                                <Link className="dropdown-item"to='/user'>Utilisateurs</Link>
                                <Link className="dropdown-item"to='/collaborateur'>Collaborateurs</Link>
                                <Link className="dropdown-item"to='/greffier'>Greffiers</Link>
                                <Link className="dropdown-item"to='/primegreffier'>Primes greffiers</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/clients" className="nav-link">Clients</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dossiers
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/dossiersList">Tous les dossiers</Link>
                                <Link className="dropdown-item" to="/dossier">Créer dossier</Link>
                                <Link className="dropdown-item" to="/emplacement">emplacement dossier</Link>

                            </div>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
                                <i className="fas fa-sign-out-alt" onClick={logout}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}
export default Header
