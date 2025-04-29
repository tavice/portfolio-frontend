import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { getProjects } from '../services/api';

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ProjectContent = styled.div`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 16px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const TechTag = styled.span`
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
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

function Projects() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <ProjectsContainer>
        <Header>
          <Title>Projects</Title>
          <Subtitle>{error}</Subtitle>
        </Header>
      </ProjectsContainer>
    );
  }

  if (!projects) {
    return (
      <ProjectsContainer>
        <Header>
          <Title>Projects</Title>
          <Subtitle>Loading projects...</Subtitle>
        </Header>
      </ProjectsContainer>
    );
  }

  return (
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Projects</Title>
        <Subtitle>Explore my latest work and personal projects</Subtitle>
      </Header>
      
      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            <ProjectImage src={project.image} alt={project.name} />
            <ProjectContent>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </TechStack>
              <ProjectLinks>
                <ProjectLink
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  GitHub
                </ProjectLink>
                {project.website && (
                  <ProjectLink
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                    Website
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}

export default Projects;
