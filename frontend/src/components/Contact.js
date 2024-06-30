import React from 'react';
import './styles/Contact.css';

const Contact = () => {
    function send() {
        alert("Thank you for your message");
        window.location.href = '/';
    }

    return (
        <div className="contact">
            <h2>Get in Touch</h2>
            <div className="contact-container">
                <div className="contact-form">
                    <textarea placeholder="Enter Message"></textarea>
                    <div className="contact-inputs">
                        <input type="text" placeholder="Enter your name" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <input type="text" placeholder="Enter Subject" />
                    <button onClick={send}>Send</button>
                </div>
                <div className="contact-info">
                    <div className="contact-item">
                        <i className="icon home-icon"></i>
                        <p>Anadh Seva organization, Kukatpally.<br />Hyderabad, 501510</p>
                    </div>
                    <div className="contact-item">
                        <i className="icon phone-icon"></i>
                        <p>9867543210<br />Mon to Fri 9am to 6pm</p>
                    </div>
                    <div className="contact-item">
                        <i className="icon email-icon"></i>
                        <p>support@anadhseva.com<br />Send us your query anytime!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
