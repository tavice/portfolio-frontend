import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import logo from "../styles/images/logo-ta.png";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 10vh;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  height: 50px;
  width: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-left: 5rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const LinkWrapper = styled.div`
  font-size: 1.5rem;
  color: #fff;
  margin-right: 1rem;
  padding: 0.5rem 0;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid #fff;
  }

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

function Header(props) {
  return (
    <HeaderWrapper>
      <Logo>
        <LogoIcon src={logo} alt="T Logo" />
        <Title>Tavice</Title>
      </Logo>
      <Nav>
        <LinkWrapper>
          <Link to="/projects">Projects</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/about">About</Link>
        </LinkWrapper>
        {/* <LinkWrapper>
          <Link to="/contact">Contact</Link>
        </LinkWrapper> */}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
