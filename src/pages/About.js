import React from "react";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";


function About(props) {
  const [about, setAbout] = useState(null);

  const getAboutData = useCallback( async () => {
    const response = await fetch(props.URL + "about");
    const data = await response.json();
    setAbout(data);
  } , [props.URL]);

  useEffect(() => {
    getAboutData();
  }, );

  const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 8px;
    width: 90%;
    margin: auto;
    font-family: 'Roboto', sans-serif;
    color: #222;
  `;

  const AboutH2 = styled.h2`
    font-size: 2rem;
  `;

  const loaded = () => (
    <AboutContainer>
      <AboutH2>{about.name}</AboutH2>
      <h3>{about.email}</h3>
      <p>{about.bio}</p>
    </AboutContainer>
  );

  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
