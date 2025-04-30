import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const FooterContainer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: 60px 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  margin-top: 80px;
  border-top: 1px solid ${({ theme }) => theme.colors.border + '0D'};
  min-height: 200px;
  will-change: transform;
  transition: all ${({ theme }) => theme.transitions.default};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterText = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.default};
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  will-change: transform;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors.background.hover};
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © {new Date().getFullYear()} Thomas Avice. All rights reserved.
        </FooterText>
        <SocialIconsContainer>
          <SocialLink
            href="https://github.com/tavice"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> GitHub
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/thomasavice"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin /> LinkedIn
          </SocialLink>
          <SocialLink
            href="mailto:thomasavice.ta@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> Email
          </SocialLink>
        </SocialIconsContainer>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
