import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { sendContactEmail } from '../services/api';

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  background: ${({ theme }) => theme.colors.background.primary};
  
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
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.fonts.body};
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
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  
  p, a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};
    font-family: ${({ theme }) => theme.fonts.body};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.highlight};
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
    background: ${({ theme }) => theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.text.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 1.2rem;
    transition: all ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.text.highlight};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
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
    font-family: ${({ theme }) => theme.fonts.body};
  }
  
  input, textarea {
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    transition: all ${({ theme }) => theme.transitions.default};
    font-family: ${({ theme }) => theme.fonts.body};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
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
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  align-self: flex-start;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 16px;
  
  ${({ success, theme }) => success ? `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  ` : `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await sendContactEmail(formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={isDarkMode ? 'dark-mode' : ''}
    >
      <Header>
        <Title>Get in Touch</Title>
        <Subtitle>Have a question or want to work together? I'd love to hear from you!</Subtitle>
      </Header>

      <ContentGrid>
        <ContactInfo>
          <ContactCard whileHover={{ y: -4 }}>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <ContactDetails>
              <h3>Email</h3>
              <a href="mailto:thomas.avice@gmail.com">thomas.avice@gmail.com</a>
            </ContactDetails>
          </ContactCard>

          <ContactCard whileHover={{ y: -4 }}>
            <IconWrapper>
              <FaMapMarkerAlt />
            </IconWrapper>
            <ContactDetails>
              <h3>Location</h3>
              <p>San Francisco Bay Area, CA</p>
            </ContactDetails>
          </ContactCard>

          <ContactCard whileHover={{ y: -4 }}>
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <ContactDetails>
              <h3>Connect</h3>
              <SocialLinks>
                <a href="https://github.com/thomasavice" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/thomasavice" target="_blank" rel="noopener noreferrer">
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
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {status.message && (
            <Message success={status.type === 'success'}>
              {status.message}
            </Message>
          )}
        </ContactForm>
      </ContentGrid>
    </Container>
  );
}

export default Contact;
