import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaGithub, FaGlobe } from "react-icons/fa";

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 80%;
  margin: 15vh auto 15vh;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    margin: 10vh auto 10vh;
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;
  border-radius: 5px;
`;

const ProjectImage = styled.img`
  position: relative;
  opacity: 0.5;
  width: 100%;
  height: auto;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;

const ProjectTitle = styled.h1`
  background-color: #333;
  width: 100%;
  position: absolute;
  top: 0;
  color: white;
  z-index: 1;
`;

const SocialLinkGit = styled.a`
  margin-right: 20px;
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: purple;
    transform: translateY(-2px);
  }
`;

const SocialLinkWebsite = styled.a`
  margin-right: 20px;
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: red;
    transform: translateY(-2px);
  }
`;

function Projects(props) {
  const [projects, setProjects] = useState(null);

  const getProjectsData = useCallback(async () => {
    const response = await fetch(props.URL + "projects");
    const data = await response.json();
    setProjects(data);
  }, [props.URL]);

  useEffect(() => {
    getProjectsData();
  }, [getProjectsData]);

  const loaded = () => {
    return (
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectContainer key={project.name}>
            <ProjectImage src={project.image} alt={project.name} />
            <ProjectTitle>
              {project.name}{" "}
              <SocialLinkGit href={project.git} target="_blank" alt={project.git}>
                <FaGithub />
              </SocialLinkGit>
              <SocialLinkWebsite href={project.live} target="_blank" alt={project.live}>
                <FaGlobe />
              </SocialLinkWebsite>
            </ProjectTitle>
          </ProjectContainer>
        ))}
      </ProjectsGrid>
    );
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects;
