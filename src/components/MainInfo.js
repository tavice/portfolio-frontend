import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

// Define styled components
const MainInfoContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  align-items: start;
  margin: ${theme.spacing.xxl} 0;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.default}, box-shadow ${theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
  }
`;

const InfoColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const MainInfoImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
  box-shadow: ${theme.shadows.md};
  border: 4px solid ${theme.colors.background};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
`;

const MainInfoList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MainInfoListItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.body.fontSize};

  svg {
    color: ${theme.colors.primary};
    font-size: 1.2em;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-weight: 600;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;

const MainInfoListItemName = styled(motion.h1)`
  font-size: ${theme.typography.h1.fontSize};
  font-weight: ${theme.typography.h1.fontWeight};
  color: ${theme.colors.text.primary};
  margin: 0;
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MainInfoListItemTitle = styled(motion.h2)`
  font-size: ${theme.typography.h2.fontSize};
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const StatementSection = styled(motion.div)`
  background: ${theme.colors.background};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    font-size: ${theme.typography.body.fontSize};
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function MainInfo({ mainInfo }) {
  return (
    <MainInfoContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <InfoColumn>
        <MainInfoImage
          src={mainInfo.headshot}
          alt="Headshot"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <MainInfoList>
          <MainInfoListItemName variants={itemVariants}>
            {mainInfo.name}
          </MainInfoListItemName>
          <MainInfoListItemTitle variants={itemVariants}>
            {mainInfo.title}
          </MainInfoListItemTitle>
          <MainInfoListItem variants={itemVariants}>
            <FaMapMarkerAlt />
            <strong>Location:</strong> {mainInfo.location}
          </MainInfoListItem>
          <MainInfoListItem variants={itemVariants}>
            <FaEnvelope />
            <strong>Email:</strong> <a href={`mailto:${mainInfo.email}`}>{mainInfo.email}</a>
          </MainInfoListItem>
          <MainInfoListItem variants={itemVariants}>
            <FaPhone />
            <strong>Phone:</strong> {mainInfo.phone}
          </MainInfoListItem>
        </MainInfoList>
      </InfoColumn>
      <StatementSection variants={itemVariants}>
        <p>
          Hey there, I am Thomas Avice (tavice!), a software engineer with a burning passion for revolutionizing 
          the cleantech, contech, and proptech industries. I have a proven track record of crafting cutting-edge 
          software solutions and am dedicated to driving innovation in these rapidly-evolving fields.
        </p>
      </StatementSection>
    </MainInfoContainer>
  );
}

export default MainInfo;
