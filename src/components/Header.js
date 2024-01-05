import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import logo from "../styles/images/logo-ta.png";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: row;
    height: auto;
    padding-bottom: 0.2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-grow: 1; /* Allow logo and title to occupy remaining width */
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const LogoIcon = styled.img`
  height: 50px;
  width: 50px;

  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
  }
`;

const Title = styled.h1`
  flex-grow: 1; /* Allow title to occupy remaining width */
  font-size: 2.5rem;
  margin: 0;
  margin-left: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-left: 0.8rem;
    margin-top: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 1rem;
  }
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

const MenuButton = styled.div`
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-right: 1rem;
  }
`;

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderWrapper>
      <Logo>
        <LogoIcon src={logo} alt="T Logo" />
        <Title>Tavice</Title>
      </Logo>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? (
          <i className="material-icons">close</i>
        ) : (
          <i className="material-icons">menu</i>
        )}
      </MenuButton>
      <Nav isOpen={isOpen}>
        <LinkWrapper>
          <Link to="/projects" onClick={toggleMenu}>
            Projects
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
        </LinkWrapper>
        {/* <LinkWrapper>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </LinkWrapper> */}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
