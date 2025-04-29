import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { theme } from "../styles/theme";

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  width: 90%;
  max-width: 1200px;
  margin: 15vh auto;
  padding: ${theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 95%;
    margin: 10vh auto;
    padding: ${theme.spacing.md};
  }
`;

const ProjectContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.default}, box-shadow ${theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  opacity: 0.8;
  transition: all ${theme.transitions.default};

  ${ProjectContainer}:hover & {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const ProjectContent = styled(motion.div)`
  padding: ${theme.spacing.lg};
  width: 100%;
`;

const ProjectTitle = styled(motion.h2)`
  font-size: ${theme.typography.h2.fontSize};
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ProjectDescription = styled(motion.p)`
  font-size: ${theme.typography.body.fontSize};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md};
  line-height: ${theme.typography.body.lineHeight};
`;

const ProjectTech = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const TechTag = styled(motion.span)`
  background: ${theme.colors.surface};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.small.fontSize};
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ProjectLink = styled(motion.a)`
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

  &.website {
    color: ${theme.colors.secondary};
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

function Projects({ URL }) {
  const [projects, setProjects] = useState(null);

  const getProjectsData = useCallback(async () => {
    try {
      const response = await fetch(URL + "projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects data:", error);
    }
  }, [URL]);

  useEffect(() => {
    getProjectsData();
  }, [getProjectsData]);

  const loaded = () => {
    return (
      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <ProjectContainer
            key={project.name}
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <ProjectImage src={project.image} alt={project.name} />
            <ProjectContent>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTech>
                {project.tech.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </ProjectTech>
              <ProjectLinks>
                <ProjectLink
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </ProjectLink>
                {project.website && (
                  <ProjectLink
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGlobe />
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectContainer>
        ))}
      </ProjectsGrid>
    );
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects;
