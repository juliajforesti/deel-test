import React, { useState, useEffect } from "react";
import CONTACTS_LIST from "../utils/contacts.json";

const FormHooks = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        subject: "",
        text: "",
    });
    const [contacts, setContacts] = useState([]);
    const [matchingContacts, setMatchingContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        const contactsList = await [...CONTACTS_LIST];
        setContacts(contactsList);
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const filterContacts = (value) => {
        const formatedValue = value.toLowerCase()
        return contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(formatedValue) || contact.email.toLowerCase().includes(formatedValue)
        );
    };

    const handleContactSelect = (value) => {
        setMatchingContacts([]);
        setFormValues({ ...formValues, email: value });
    };

    useEffect(() => {
        setMatchingContacts(filterContacts(formValues.email));
        if (formValues.email === "") {
            setMatchingContacts([]);
        }
    }, [formValues.email]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkFields()) {
            window.alert("Please fill in all the fields");
        } else {
            setFormValues({ email: "", subject: "", text: "" });
            window.alert("Email successfully sent");
        }
    };

    const checkFields = () => {
        return Object.keys(formValues).some((item) => !formValues[item]);
    };

    return (
        <div className="form-container">
            <form>
                <div className="form-field">
                    <label>Send to: </label>
                    <input
                        onChange={handleChange}
                        value={formValues.email}
                        type="text"
                        name="email"
                    />
                </div>
                {matchingContacts.length ? (
                    <div className="contact-result">
                        {matchingContacts.map((contact, i, arr) => (
                            <div
                                key={i}
                                className="contact"
                                onClick={() =>
                                    handleContactSelect(contact.email)
                                }
                            >
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                                {i !== arr.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                ) : null}
                <div className="form-field">
                    <label>Subject: </label>
                    <input
                        onChange={handleChange}
                        value={formValues.subject}
                        type="text"
                        name="subject"
                    />
                </div>
                <textarea
                    cols="30"
                    rows="10"
                    name="text"
                    value={formValues.text}
                    onChange={handleChange}
                ></textarea>
                <button onClick={handleSubmit}>Send</button>
            </form>
        </div>
    );
};

export default FormHooks;
