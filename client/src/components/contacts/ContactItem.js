import React, {useContext} from "react";
import ContactContext from '../../context/contact/contactContext';
import propTypes from 'prop-types'

function ContactItem({ contact }) {
    const contactContext = useContext(ContactContext);
    const { deleteContact, deleteSearchContact, setCurrent, filtered } = contactContext;

    const { id, name, email, phone, type } = contact;
    
    
    const handleDelete = id => {
        if (filtered) {
            deleteSearchContact(id);
        } else {
            deleteContact(id);
        }
    }

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}{" "}
				<span
					className={
						"badge " + (type === "professional" ? "badge-success" : "badge-primary")
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fas fa-envelope-open"></i> {email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone"></i> {phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(id)}>Delete</button>
            </p>
		</div>
	);
}

ContactItem.propTypes = {
    contact: propTypes.object.isRequired,
};

export default ContactItem;
