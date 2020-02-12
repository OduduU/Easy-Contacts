import React, { useReducer } from "react";
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./AuthReducer";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	aUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../types";

const AuthState = props => {
	const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    
	// Register User
	const register = async formData => {
		try {
			const res = await axios.post('/api/users', formData, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			});
		}
	}

    // Login User

    // Logout

	// Clear Errors
	const clearError = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				clearError
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
