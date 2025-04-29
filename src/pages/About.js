import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { getAbout } from '../services/api';

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
  margin-bottom: 80px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-bottom: 32px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 4px solid ${({ theme }) => theme.colors.background};
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 32px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;
  
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.2s ease;
    padding: 8px 16px;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.surface};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    svg {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const Section = styled.section`
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 2px;
    }
  }
`;

const Statement = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 32px;
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin: 40px 0;
`;

const TechItem = styled(motion.div)`
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CTAContainer = styled.div`
  text-align: center;
  margin-top: 48px;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 122, 255, 0.3);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

function About() {
  const [about, setAbout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbout();
        setAbout(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Container>
        <Statement>{error}</Statement>
      </Container>
    );
  }

  if (!about) {
    return (
      <Container>
        <Statement>Loading...</Statement>
      </Container>
    );
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <ProfileImage src={about.mainInfo.headshot} alt={about.mainInfo.name} />
        <Name>{about.mainInfo.name}</Name>
        <Title>{about.mainInfo.title}</Title>
        <ContactInfo>
          <a href={`mailto:${about.mainInfo.email}`}>
            <FaEnvelope /> {about.mainInfo.email}
          </a>
          <a href={about.contact.github} target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href={about.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </ContactInfo>
      </Header>

      <Section>
        <Statement>{about.intro}</Statement>
      </Section>

      <Section>
        <h2>Tech Stack</h2>
        <TechStack>
          {about.techstack.map((tech, index) => (
            <TechItem
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </TechItem>
          ))}
        </TechStack>
      </Section>

      <Section>
        <h2>Expertise</h2>
        <Statement>{about.expertise}</Statement>
      </Section>

      <Section>
        <h2>Always Learning</h2>
        <Statement>{about.learner}</Statement>
      </Section>

      <Section>
        <h2>Let's Connect</h2>
        <Statement>{about.connect}</Statement>
        <CTAContainer>
          <CTAButton
            href={`mailto:${about.mainInfo.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> Get in Touch
          </CTAButton>
        </CTAContainer>
      </Section>
    </Container>
  );
}

export default About;
