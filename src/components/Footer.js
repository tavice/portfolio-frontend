import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer(props) {

  const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2f2f2f;
    padding: 30px;
    color: #fff;
    font-size: 1.5rem;
    margin-top: 1rem;
  `;

  const FooterText = styled.p`
    margin: 0;
  `;

  const SocialIconsContainer = styled.div`
    display: flex;
    align-items: center;
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
  const SocialLinkLinkedin = styled.a`
    margin-right: 20px;
    color: #fff;
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: blue;
      transform: translateY(-2px);
    }
  `;



  return (
    <FooterContainer>
      <FooterText>My Portfolio by Thomas Avice © 2023</FooterText>
      <SocialIconsContainer>
        <SocialLinkGit href="https://github.com/tavice" target="_blank">
          <FaGithub />
        </SocialLinkGit>
        <SocialLinkLinkedin href="https://www.linkedin.com/in/thomasavice/" target="_blank">
          <FaLinkedin />
        </SocialLinkLinkedin>
      </SocialIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
