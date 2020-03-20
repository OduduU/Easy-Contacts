import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function PrivateRoute({ component: Component, ...rest }) {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading, loadUser } = authContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	if (loading) return <h1>Loading...</h1>;

	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
