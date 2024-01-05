import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const AboutH2 = styled.h2`
  font-size: 2rem;
`;

const AboutP = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const AboutLink = styled(Link)`
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
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
      <AboutH2>{about.name}</AboutH2>
      <h3>{about.email}</h3>
      <AboutP>{about.bio}</AboutP>
      <AboutP>
        Check out my <AboutLink to="/projects">projects!</AboutLink>
      </AboutP>
    </AboutContainer>
  );

  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
