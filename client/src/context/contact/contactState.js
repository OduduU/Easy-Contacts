import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CONTACTS,
    DELETE_SEARCH_CONTACT,
    CONTACT_ERROR,
    UPDATE_SEARCH_CONTACT
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {

        const config = setAuthToken();

        try {
            const res = await axios.get('/api/contacts', config);

            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

    // Add Contact
    const addContact = async contact => {

        const config = setAuthToken();

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

    // Delete Contacts
    const deleteContact = async id => {

        const config = setAuthToken();

        try {
            await axios.delete(`/api/contacts/${id}`, config);


            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Update Contact
    const updateContact = async contact => {

        const config = setAuthToken();

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {    
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    }

    // Clear Contact
    const clearContacts = id => {
        dispatch({ type: CLEAR_CONTACTS });
    }

    // Delete Search Contact
    const deleteSearchContact = async id => {

        const config = setAuthToken();

        try {
            await axios.delete(`/api/contacts/${id}`, config);


            dispatch({ type: DELETE_SEARCH_CONTACT, payload: id });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        // dispatch({ type: DELETE_SEARCH_CONTACT, payload: id });

        // clearCurrent();
    }

    // Update Search Contact
    const updateSearchContact = async contact => {

        const config = setAuthToken();

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: UPDATE_SEARCH_CONTACT,
                payload: res.data
            })
        } catch (err) {    
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }

        // dispatch({ type: DELETE_SEARCH_CONTACT, payload: id });

        // clearCurrent();
    }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER }); 
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                deleteSearchContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts,
                updateSearchContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;