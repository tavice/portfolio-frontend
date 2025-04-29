import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelopeOpen, FaCode } from 'react-icons/fa';
import { theme } from '../styles/theme';
import MainInfo from '../components/MainInfo';
import { getAbout, getMainInfo } from '../services/api';

const AboutContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.xl};
  margin: 10vh auto;
  width: 90%;
  max-width: 1400px;
  padding: ${theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.md};
    margin: 5vh auto;
  }
`;

const MainInfoSection = styled(motion.div)`
  grid-column: 1 / -1;
  margin-bottom: ${theme.spacing.xl};
`;

const ContentGrid = styled(motion.div)`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.default}, box-shadow ${theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};

  svg {
    font-size: 2rem;
    color: ${theme.colors.primary};
  }

  span {
    font-size: 0.9rem;
    text-align: center;
    color: ${theme.colors.text.primary};
  }
`;

const SocialSection = styled(motion.div)`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.surface};
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.text.inverse};
  }

  &.github:hover {
    background: #333;
  }

  &.linkedin:hover {
    background: #0077b5;
  }

  &.email:hover {
    background: #ea4335;
  }
`;

const ProjectsLink = styled(motion(Link))`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  font-weight: 600;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primaryDark};
    box-shadow: ${theme.shadows.lg};
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

function About() {
  const [about, setAbout] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, mainInfoData] = await Promise.all([
          getAbout(),
          getMainInfo()
        ]);
        setAbout(aboutData);
        setMainInfo(mainInfoData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const getTechIcon = (tech) => {
    // Add your tech icon mapping logic here
    return <FaCode />;
  };

  if (error) {
    return (
      <AboutContainer>
        <ContentCard>
          <h2>Error</h2>
          <p>{error}</p>
        </ContentCard>
      </AboutContainer>
    );
  }

  const loaded = () => (
    <AboutContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MainInfoSection variants={itemVariants}>
        <MainInfo mainInfo={mainInfo} />
      </MainInfoSection>

      <ContentGrid>
        <ContentCard variants={itemVariants}>
          <TechStackGrid>
            {about?.techstack?.map((tech, index) => (
              <TechItem
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTechIcon(tech)}
                <span>{tech}</span>
              </TechItem>
            )) || (
              <TechItem>
                <FaCode />
                <span>Loading tech stack...</span>
              </TechItem>
            )}
          </TechStackGrid>
        </ContentCard>

        <ContentCard variants={itemVariants}>
          <p>{about.expertise}</p>
        </ContentCard>

        <ContentCard variants={itemVariants}>
          <p>{about.learner}</p>
        </ContentCard>

        <ContentCard variants={itemVariants}>
          <p>{about.github}</p>
        </ContentCard>

        <ContentCard variants={itemVariants}>
          <p>{about.connect}</p>
        </ContentCard>

        <ContentCard variants={itemVariants}>
          <p>{about.calltoaction}</p>
        </ContentCard>
      </ContentGrid>

      <SocialSection variants={itemVariants}>
        <SocialMediaContainer>
          <SocialLink
            href="https://github.com/tavice"
            target="_blank"
            rel="noopener noreferrer"
            className="github"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/thomasavice/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </SocialLink>
          <SocialLink
            href="mailto:thomas.avice@gmail.com"
            className="email"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelopeOpen />
          </SocialLink>
        </SocialMediaContainer>

        <ProjectsLink
          to="/projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Projects
        </ProjectsLink>
      </SocialSection>
    </AboutContainer>
  );

  return about && mainInfo ? loaded() : <h1>Loading...</h1>;
}

export default About;
