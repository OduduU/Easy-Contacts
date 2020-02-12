import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactsFilter from '../contacts/ContactsFilter'

export const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactsFilter />
                <Contacts />
            </div>
        </div>
    )
}
