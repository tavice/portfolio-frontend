import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { getAbout } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};
  
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
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto 32px;
  display: block;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 4px solid ${({ theme }) => theme.colors.background.primary};
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 32px;
  font-family: ${({ theme }) => theme.fonts.heading};
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
    transition: all 0.3s ease;
    padding: 8px 16px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.background.secondary};
    font-family: ${({ theme }) => theme.fonts.body};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
      background: ${({ theme }) => theme.colors.background.secondary};
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
    font-family: ${({ theme }) => theme.fonts.heading};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
  }
`;

const Statement = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 32px;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin: 40px 0;
`;

const TechItem = styled(motion.div)`
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
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
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};
  font-family: ${({ theme }) => theme.fonts.body};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    opacity: 0.9;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

function About() {
  const [about, setAbout] = useState({
    mainInfo: {
      name: '',
      title: '',
      email: '',
      headshot: ''
    },
    contact: {
      github: '',
      linkedin: ''
    },
    intro: '',
    techstack: [],
    expertise: '',
    learner: '',
    connect: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbout();
        setAbout(data || about);
        setError(null);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>{error}</p>
        </div>
      </Container>
    );
  }

  const { mainInfo, contact, intro, techstack, expertise, learner, connect } = about;

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <Header>
        {mainInfo.headshot && (
          <ProfileImage src={mainInfo.headshot} alt={mainInfo.name} />
        )}
        <Name>{mainInfo.name}</Name>
        <Title>{mainInfo.title}</Title>
        <ContactInfo>
          {mainInfo.email && (
            <a href={`mailto:${mainInfo.email}`}>
              <FaEnvelope /> {mainInfo.email}
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          )}
        </ContactInfo>
      </Header>

      <Section>
        <Statement>{intro}</Statement>
      </Section>

      {techstack && techstack.length > 0 && (
        <Section>
          <h2>Tech Stack</h2>
          <TechStack>
            {techstack.map((tech, index) => (
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
      )}

      {expertise && (
        <Section>
          <h2>Expertise</h2>
          <Statement>{expertise}</Statement>
        </Section>
      )}

      {learner && (
        <Section>
          <h2>Always Learning</h2>
          <Statement>{learner}</Statement>
        </Section>
      )}

      {connect && (
        <Section>
          <h2>Let's Connect</h2>
          <Statement>{connect}</Statement>
          <CTAContainer>
            <CTAButton
              href={`mailto:${mainInfo.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope /> Get in Touch
            </CTAButton>
          </CTAContainer>
        </Section>
      )}
    </Container>
  );
}

export default About;
