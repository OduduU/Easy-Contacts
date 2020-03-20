import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

function Navbar() {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;	
	const { clearContacts } = contactContext;	

    const onLogout = () => {
		logout();
		clearContacts();
    }

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a onClick={onLogout} href="#!">
					<i className="fas fa-sign-out-alt"></i>{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks =  (
		<Fragment>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<Link to="/">
					<i className="fa fa-id-card-alt" /> Easy Contacts
				</Link>
			</h1>
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
