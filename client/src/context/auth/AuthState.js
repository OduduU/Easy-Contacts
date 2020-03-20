import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./AuthReducer";
// import setAuthToken from "../../utils/setAuthToken";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../types";

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		// setAuthToken(localStorage.token);
		let token;

		if (localStorage.getItem("token")) {
			token = localStorage.getItem("token");
		}

		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": token
			}
		};

		try {
			const res = await axios.get("/api/auth", config);

			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// Register User
	const register = async formData => {
		try {
			const res = await axios.post("/api/users", formData, {
				headers: {
					"Content-Type": "application/json"
				}
			});

			console.log('res: ', res)

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Login User
	const login = async formData => {
		try {
			const res = await axios.post("/api/auth", formData, {
				headers: {
					"Content-Type": "application/json"
				}
			});

			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearErrors,
				loadUser,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
