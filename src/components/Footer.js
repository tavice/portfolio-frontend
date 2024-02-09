import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2f2f2f;
  padding: 20px;
  color: #fff;
  font-size: 1.2rem;
  margin-top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialLink = styled.a`
  margin: 0 10px;
  color: #fff;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

function Footer(props) {
  return (
    <FooterContainer>
      <FooterText>My Portfolio by Thomas Avice © 2024</FooterText>
      <SocialIconsContainer>
        <SocialLink
          href="https://github.com/tavice"
          target="_blank"
          style={{ color: "purple" }}
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/thomasavice/"
          target="_blank"
          style={{ color: "blue" }}
        >
          <FaLinkedin />
        </SocialLink>
      </SocialIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
