import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaEnvelopeOpen } from "react-icons/fa";

//Import MainInfo component
import MainInfo from "../components/MainInfo";

//Basic styled components
const AboutContainer = styled.div`
  display: flex;
  margin: 10vh auto auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  width: 90%;

  font-family: "Roboto", sans-serif;
  color: #222;
`;

const AboutP = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const AboutLink = styled(Link)`
  background-color: #333;
  color: #fff;
  font-size: 1.2rem;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

// styled components for different sections


const AboutTagline = styled.h1`
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
`;

const AboutIntro = styled.p`
  font-size: 1.4rem;
  margin-bottom: 16px;
`;

const AboutTechStack = styled.p`
  font-size: 1.2rem;
  margin-bottom: 16px;
  border: 1px solid #333;
  padding: 8px 16px;
  border-radius: 8px;
`;

const AboutExpertise = styled.p`
  font-size: 1.2rem;
  margin-bottom: 16px;
`;

const AboutLearning = styled.p`
  font-size: 1.2rem;
  margin-bottom: 16px;
`;

const AboutGithub = styled.p`
  font-size: 1.2rem;
  margin-bottom: 16px;
`;

//special container
const GitHubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;
  border-radius: 5px;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-around;
  margin: 10px;
  padding: 10px;
  height: 100%;
  width: 50%;
  position: relative;
  overflow: hidden;
`;

//styled components for social media links
const SocialLinkGit = styled.a`
  margin-right: 20px;
  color: purple;
  font-size: 3rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: black;
    transform: translateY(-2px);
  }
`;

const SocialLinkLinkedin = styled.a`
  margin-right: 20px;
  color: blue;
  font-size: 3rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: black;
    transform: translateY(-2px);
  }
`;

const SocialLinkMail = styled.a`
  margin-right: 20px;
  color: black;
  font-size: 3rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: grey;
    transform: translateY(-2px);
  }
`;

function About(props) {
  const [about, setAbout] = useState(null);

  const getAboutData = useCallback(async () => {
    const response = await fetch(props.URL + "about");
    const data = await response.json();
    setAbout(data);
  }, [props.URL]);

  useEffect(() => {
    getAboutData();
  }, [getAboutData]);

  const loaded = () => (
    <AboutContainer>
      {Object.entries(about).map(([section, content]) => {
        switch (section) {
          case "mainInfo":
            return <MainInfo key={section} mainInfo={content} />;
          case "tagline":
            return <AboutTagline key={section}>🚀{content}</AboutTagline>;
          case "intro":
            return <AboutIntro key={section}>👋 {content}</AboutIntro>;
          case "techstack":
            return (
              <AboutTechStack key={section}>
                <b>🌐 Tech Stack:</b> {content}
              </AboutTechStack>
            );
          case "expertise":
            return (
              <AboutExpertise key={section}>
                <b>🧑‍💻 Expertise:</b> {content}
              </AboutExpertise>
            );
          case "learner":
            return (
              <AboutLearning key={section}>
                <b>📚 Constant Learner:</b> {content}
              </AboutLearning>
            );
          case "github":
            return (
              <GitHubContainer>
                <AboutLink key={section} to={"https://github.com/tavice"}>
                  View my GitHub
                </AboutLink>
                <AboutGithub>
                  <b>🔗Github Enthusiast:</b> {content}
                </AboutGithub>
              </GitHubContainer>
            );
          case "contact":
            return (
              <SocialMediaContainer>
                {Object.entries(content).map(([section, content]) => {
                  switch (section) {
                    case "email":
                      return (
                        <SocialLinkMail href={"mailto:" + content}>
                          <FaEnvelopeOpen />
                        </SocialLinkMail>
                      );
                    case "linkedin":
                      return (
                        <SocialLinkLinkedin
                          href={content}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLinkedin />
                        </SocialLinkLinkedin>
                      );
                    case "github":
                      return (
                        <SocialLinkGit
                          href={content}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaGithub />
                        </SocialLinkGit>
                      );
                    default:
                      return <AboutP key={section}>{content}</AboutP>;
                  }
                })}
              </SocialMediaContainer>
            );

          case "calltoaction":
            return (
              <AboutLink key={section} to={"/projects"}>
                {content}
              </AboutLink>
            );
          default:
            return <AboutP key={section}>{content}</AboutP>;
        }
      })}
    </AboutContainer>
  );

  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
