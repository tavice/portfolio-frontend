import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f2f2f;
  padding: 30px;
  color: #fff;
  font-size: 1.5rem;
  margin-top: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto;
`;

const FooterText = styled.p`
  margin: 0;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  margin-right: 20px;
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
      <FooterText>My Portfolio by Thomas Avice © 2023</FooterText>
      <SocialIconsContainer>
        <SocialLink 
          href="https://github.com/tavice" 
          target="_blank" 
          style={{ color: 'purple' }}
        >
          <FaGithub />
        </SocialLink>
        <SocialLink 
          href="https://www.linkedin.com/in/thomasavice/" 
          target="_blank" 
          style={{ color: 'blue' }}
        >
          <FaLinkedin />
        </SocialLink>
      </SocialIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
