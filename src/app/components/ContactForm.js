'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contactForm.css';

const EMAIL_TEMPLATE_ID="template_h1j3067";
const EMAIL_SERVICE_ID="service_ax0zidb";
const EMAIL_PUBLIC_KEY="b4xKjEpLePw946hbU";

function initialize_email_service() {
    emailjs.init({
        publicKey: EMAIL_PUBLIC_KEY,
        blockHeadless: true,
        blockList: {
            list: [],
            watchVariable: 'userEmail'
        },
        limitRate: {
            id: 'stub-lovers',
            throttle: 10000
        }
    });
}

function configure_form_data(formData) {
    return {
        description: formData.bugDescription,
        steps: formData.stepsToReproduce
    };
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    bugDescription: '',
    stepsToReproduce: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You'll implement the email sending function here
    initialize_email_service();
    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, configure_form_data(formData)).then(
        (response) => {
            console.log("Your bug has been reported")
        },
        (error) => {
            console.log("Error sending email: ", error)
        }
    );
  };

  return (
    <div className="contact-form-container">
      <h2>Report a Bug</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bugDescription">Bug Description</label>
          <textarea
            id="bugDescription"
            name="bugDescription"
            value={formData.bugDescription}
            onChange={handleChange}
            rows="3"
            required
            placeholder="Briefly describe the issue..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="stepsToReproduce">Steps to Reproduce</label>
          <textarea
            id="stepsToReproduce"
            name="stepsToReproduce"
            value={formData.stepsToReproduce}
            onChange={handleChange}
            rows="6"
            required
            placeholder="1. Go to...
2. Click on...
3. Observe..."
          />
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>
    </div>
  );
};