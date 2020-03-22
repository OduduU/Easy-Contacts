import React, { useState, useContext, useEffect } from "react";
import ContactContext from '../../context/contact/contactContext';


function ContactForm() {
	const contactContext = useContext(ContactContext);
	const { addContact, updateContact, filtered, updateSearchContact, current, clearCurrent } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: "",
				email: "",
				phone: "",
				type: "personal"
			});
		}

		// eslint-disable-next-line
	}, [current, contactContext])

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal"
	});

    const { name, email, phone, type } = contact;
    
    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addContact(contact);
		} else {
			if (filtered) {
				updateSearchContact(contact);
				// clearCurrent();
			} else {
				updateContact(contact);
				// clearCurrent();
			}
			updateContact(contact);
		}
        clearAll()
	};
	
	function clearAll() {
		clearCurrent()
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
				required
			/>
			<input
				type="text"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
				required
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === "personal"}
				onChange={onChange}
			/>{" "}
			Personal{" "}
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === "professional"}
				onChange={onChange}
			/>{" "}
			Professional
			<div>
				<input
					type="submit"
					value={current ? 'Update' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
				</div>
			)}
		</form>
	);
}

export default ContactForm;
