import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "framer-motion";
import logo from "../styles/images/logo-ta.png";
import { theme } from "../styles/theme";

const HeaderWrapper = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.surface};
  transition: all ${theme.transitions.default};

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${theme.spacing.sm};
`;

const LogoIcon = styled(motion.img)`
  height: 40px;
  width: 40px;
  border-radius: ${theme.borderRadius.full};
`;

const Title = styled(motion.h1)`
  font-size: ${theme.typography.h2.fontSize};
  font-weight: ${theme.typography.h2.fontWeight};
  margin: 0;
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${theme.colors.background};
    padding: ${theme.spacing.md};
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid ${theme.colors.surface};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

const LinkWrapper = styled(motion.div)`
  position: relative;
  font-size: ${theme.typography.body.fontSize};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xs} 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
    transition: width ${theme.transitions.default};
  }

  &:hover::after {
    width: 100%;
  }

  & > a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
  }
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.full};
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.surface};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 50) {
        document.body.style.setProperty('--header-height', '60px');
      } else {
        document.body.style.setProperty('--header-height', '70px');
      }
    });
  }, [scrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderWrapper
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogoIcon
            src={logo}
            alt="T Logo"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
          <Title>Tavice</Title>
        </Logo>
      </Link>
      <MenuButton
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? "×" : "☰"}
      </MenuButton>
      <AnimatePresence>
        {isOpen && (
          <Nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <LinkWrapper
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projects" onClick={toggleMenu}>
                Projects
              </Link>
            </LinkWrapper>
            <LinkWrapper
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </LinkWrapper>
          </Nav>
        )}
      </AnimatePresence>
      {/* Desktop Navigation */}
      <Nav className="desktop-nav" style={{ display: 'flex' }}>
        <LinkWrapper
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects">
            Projects
          </Link>
        </LinkWrapper>
        <LinkWrapper
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/about">
            About
          </Link>
        </LinkWrapper>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
