import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { getProjects } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: background-color 0.3s ease, color 0.3s ease;
  
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
  transition: color 0.3s ease;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.3s ease;
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
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
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
  color: ${({ theme }) => theme.colors.text.primary};
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 16px;
  line-height: 1.5;
  transition: color 0.3s ease;
  
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
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.3s ease;
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
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
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
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Header>
        <Title>My Projects</Title>
        <Subtitle>Here are some of the projects I've worked on</Subtitle>
      </Header>

      {error ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>{error}</p>
        </div>
      ) : (
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id || index}
              variants={itemVariants}
              initial="hidden"
              animate={isLoading ? "hidden" : "visible"}
              custom={index}
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
      )}
    </ProjectsContainer>
  );
}

export default Projects;
