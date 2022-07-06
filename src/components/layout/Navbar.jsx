import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

export const Navbar = (props) => {

    const userLocal = JSON.parse(sessionStorage.getItem('user'))
    const { user } = useContext(AuthContext)

    const navLinks = userLocal || user ? <SignedInLinks /> : <SignedOutLinks />

    return (
        <div className="navbar">
            <Link to='/' className="brand-logo">Mentos</Link>
            {navLinks}
        </div>
    )
};

export const SignedInLinks = () => {

    const { signOut } = useContext(AuthContext)
    return (
        <ul className="nav-links">
            <li><NavLink to="/create">New Post</NavLink></li>
            <li><NavLink to="/" onClick={signOut}>Logout</NavLink></li>
            <li><NavLink to="/account">Account</NavLink></li>
        </ul>
    );
};

export const SignedOutLinks = () => {
    return (
        <ul className="nav-links">
            <li><NavLink to="/signin">Login</NavLink></li>
            <li><NavLink to="/signup">SignUp</NavLink></li>
        </ul>
    );
};

export default Navbar;