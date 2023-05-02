import React, { useState } from "react";
import styled, { css } from "styled-components";

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
`;

const ContactInput = styled.input`
  margin-bottom: 10px;
`;

const ContactTextarea = styled.textarea`
  margin-bottom: 10px;
`;

const ContactButton = styled.button`
  width: 100px;
  margin: auto;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 8px;
  width: 90%;
  margin: auto;
  font-family: "Roboto", sans-serif;
  color: #222;
`;

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { name, email, phone, message };

    fetch('http://localhost:4000/api/contact', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for contacting us!");
        } else {
          alert("Oops! Something went wrong.");
        }
      })
      .catch((error) => {
        alert("Oops! Something went wrong.");
      });
  };

  return (
    <>
      <ContactContainer>
      <h1>Contact Me!</h1>
      <ContactForm onSubmit={handleSubmit}>
        <ContactInput
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <ContactInput
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <ContactInput
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <ContactTextarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <ContactButton type="submit">Submit</ContactButton>
      </ContactForm>
      </ContactContainer>
    </>
  );
}

export default Contact;
