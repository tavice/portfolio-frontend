import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { theme } from '../styles/theme';
import { sendContactEmail } from '../services/api';

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ContactCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p, a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.secondary};
    border-radius: 50%;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  input, textarea {
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.colors.text.tertiary};
    border-radius: 8px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background};
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 14px 28px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 122, 255, 0.3);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.text.tertiary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.success};
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 16px;
`;

const ErrorMessage = styled(motion.div)`
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 16px;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      await sendContactEmail(formData);
      
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: error.response?.data?.error || 'Failed to send message. Please try again later.'
      });
    }
  };
  
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Get in Touch</Title>
        <Subtitle>
          Have a question or want to work together? Feel free to reach out!
        </Subtitle>
      </Header>
      
      <ContentGrid>
        <ContactInfo>
          <ContactCard
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <ContactDetails>
              <h3>Email</h3>
              <a href="mailto:thomasavice.ta@gmail.com">thomasavice.ta@gmail.com</a>
              <p>Feel free to email me anytime!</p>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <ContactDetails>
              <h3>Phone</h3>
              <a href="tel:+14154073693">+1 (415) 407-3693</a>
              <p>Available during business hours</p>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <IconWrapper>
              <FaMapMarkerAlt />
            </IconWrapper>
            <ContactDetails>
              <h3>Location</h3>
              <p>San Francisco, CA</p>
              <p>Open to remote work opportunities</p>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <IconWrapper>
              <FaGithub />
            </IconWrapper>
            <ContactDetails>
              <h3>Connect</h3>
              <p>Let's connect on social media</p>
              <SocialLinks>
                <a href="https://github.com/tavice" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/thomasavice" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </SocialLinks>
            </ContactDetails>
          </ContactCard>
        </ContactInfo>
        
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={status.submitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
          
          {status.success && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Thank you for your message! I'll get back to you soon.
            </SuccessMessage>
          )}
          
          {status.error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {status.error}
            </ErrorMessage>
          )}
        </ContactForm>
      </ContentGrid>
    </Container>
  );
}

export default Contact;
