import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/src/collapse';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import { useContext, useEffect } from 'react';
import { myHistory } from 'util/history';
import { AuthContext } from 'AuthContext';

function Navbar() {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    myHistory.replace('/');
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-primary"
      id="main-nav"
    >
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalag</h4>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" end>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" end>
                CATALAGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" end>
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <NavLink to="/admin/auth">LOGIN</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
