import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelopeOpen } from "react-icons/fa";
import { theme } from "../styles/theme";

//Import MainInfo component
import MainInfo from "../components/MainInfo";

//Basic styled components
const AboutContainer = styled(motion.div)`
  display: flex;
  margin: 10vh auto auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 1200px;
  padding: ${theme.spacing.xl};
  gap: ${theme.spacing.xl};
`;

const AboutP = styled(motion.p)`
  font-size: ${theme.typography.body.fontSize};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.text.primary};
  max-width: 800px;
  text-align: center;
`;

const AboutLink = styled(motion(Link))`
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.background};
  font-size: ${theme.typography.body.fontSize};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.xl};
  transition: all ${theme.transitions.default};
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

// styled components for different sections


const AboutTagline = styled(motion.h1)`
  font-weight: ${theme.typography.h1.fontWeight};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.background};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
`;

const AboutIntro = styled(motion.p)`
  font-size: ${theme.typography.h3.fontSize};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text.primary};
  text-align: center;
  max-width: 800px;
`;

const AboutTechStack = styled(motion.div)`
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 800px;
`;

const AboutExpertise = styled(motion.div)`
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 800px;
`;

const AboutLearning = styled(motion.div)`
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 800px;
`;

const AboutGithub = styled(motion.div)`
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: 800px;
`;

//special container
const GitHubContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.md};
`;

const SocialMediaContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

//styled components for social media links
const SocialLink = styled(motion.a)`
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  transition: all ${theme.transitions.default};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &.github {
    color: ${theme.colors.primary};
  }

  &.linkedin {
    color: ${theme.colors.secondary};
  }

  &.email {
    color: ${theme.colors.text.primary};
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function About({ URL }) {
  const [about, setAbout] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);

  const getAbout = useCallback(async () => {
    try {
      const response = await fetch(URL + "about");
      const data = await response.json();
      setAbout(data);
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  }, [URL]);

  const getMainInfo = useCallback(async () => {
    try {
      const response = await fetch(URL + "about");
      const data = await response.json();
      setMainInfo(data);
    } catch (error) {
      console.error("Error fetching main info:", error);
    }
  }, [URL]);

  useEffect(() => {
    getAbout();
    getMainInfo();
  }, [getAbout, getMainInfo]);

  const loaded = () => (
    <AboutContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MainInfo mainInfo={mainInfo} />
      <AboutTagline variants={itemVariants}>
        {about.tagline}
      </AboutTagline>
      <AboutIntro variants={itemVariants}>
        {about.intro}
      </AboutIntro>
      <AboutTechStack variants={itemVariants}>
        <strong>Tech Stack:</strong> {about.techStack}
      </AboutTechStack>
      <AboutExpertise variants={itemVariants}>
        <strong>Expertise:</strong> {about.expertise}
      </AboutExpertise>
      <AboutLearning variants={itemVariants}>
        <strong>Currently Learning:</strong> {about.learning}
      </AboutLearning>
      <AboutGithub variants={itemVariants}>
        <strong>GitHub:</strong> {about.github}
      </AboutGithub>
      <GitHubContainer variants={itemVariants}>
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
      </GitHubContainer>
      <AboutLink
        to="/projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View My Projects
      </AboutLink>
    </AboutContainer>
  );

  return about && mainInfo ? loaded() : <h1>Loading...</h1>;
}

export default About;
