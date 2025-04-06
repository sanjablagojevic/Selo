import React from 'react';
import { AuthorizedUser } from '../AuthorizeView';
import LogoutLink from '../LogoutLink';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="../src/assets/logo_digitalno_selo.png" alt="Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="#hero">Početna</a></li>
                    <li><Link to="/selo-list">Sela</Link></li>
                    <li><a href="/korisnici">Korisnici</a></li>
                    <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
