import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { theme } from "../styles/theme";

const FooterContainer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.body.fontSize};
  margin-top: ${theme.spacing.xxl};
  border-top: 1px solid ${theme.colors.surface};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const FooterText = styled(motion.p)`
  margin: 0;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
`;

const SocialIconsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  transition: all ${theme.transitions.default};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.background};
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
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function Footer() {
  return (
    <FooterContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FooterText variants={itemVariants}>
        My Portfolio by Thomas Avice © 2024
      </FooterText>
      <SocialIconsContainer variants={itemVariants}>
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
      </SocialIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
