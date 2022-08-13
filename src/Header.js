import {Link, useHistory} from "react-router-dom";

const Header = () => {
    const history = useHistory();
   const logout = () => {
        localStorage.removeItem('token');
       history.push('/login')

   }
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/user" className="nav-link">Home</Link>
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
            </nav>
        </div>

    )
}
export default Header
