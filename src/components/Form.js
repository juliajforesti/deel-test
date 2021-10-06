import React, { Component } from "react";
import contacts from "../utils/contacts.json";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            subject: "",
            text: "",
            contacts: [],
            matchingContacts: [],
        };
    }
    componentDidMount() {
        this.getContacts();
        console.log(this.state.contacts);
    }

    getContacts = async () => {
        const contactsList = await [...contacts];
        this.setState({ contacts: contactsList });
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    filterContacts = (value) => {
        const formatedValue = value.toLowerCase()
        return this.state.contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(formatedValue) || contact.email.toLowerCase().includes(formatedValue)
        );
    };

    handleContactSelect = (value) => {
        this.setState({matchingContacts: [] , email: value});
    };

    componentDidUpdate(_, prevState) {
        if (this.state.email !== prevState.email) {
            this.setState({
                matchingContacts: this.filterContacts(this.state.email),
            });
            if (this.state.email === "") {
                this.setState({ matchingContacts: [] });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.checkFields()){
            window.alert("Please fill in all the fields");
        } else {
            this.setState({ email: "", subject: "" });
            window.alert("Email successfully sent");
        }
    };

    checkFields = () => {
        return Object.keys(this.state).some(item => !this.state[item])
    }

    render() {
        return (
            <div className="form-container">
                <form>
                    <div className="form-field">
                        <label>Send to: </label>
                        <input
                            onChange={this.handleChange}
                            value={this.state.email}
                            type="text"
                            name="email"
                        />
                    </div>
                    {this.state.matchingContacts.length ? (
                        <div className="contact-result">
                            {this.state.matchingContacts.map(
                                (contact, i, arr) => (
                                    <div
                                        key={i}
                                        className="contact"
                                        onClick={() =>
                                            this.handleContactSelect(
                                                contact.email
                                            )
                                        }
                                    >
                                        <p>{contact.name}</p>
                                        <p>{contact.email}</p>
                                        {i !== arr.length - 1 && <hr />}
                                    </div>
                                )
                            )}
                        </div>
                    ) : null}
                    <div className="form-field">
                        <label>Subject: </label>
                        <input
                            onChange={this.handleChange}
                            value={this.state.subject}
                            type="text"
                            name="subject"
                        />
                    </div>
                    <textarea
                        cols="30"
                        rows="10"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                    ></textarea>
                    <button onClick={this.handleSubmit}>Send</button>
                </form>
            </div>
        );
    }
}

export default Form;
