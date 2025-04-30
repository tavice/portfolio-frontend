import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { useScroll } from 'framer-motion';
import logo from '../styles/images/logo-ta.png';
import { useTheme } from '../context/ThemeContext';

const HeaderWrapper = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${({ theme, $isScrolled }) => 
    $isScrolled 
      ? theme.colors.background.primary + 'F2'
      : theme.colors.background.primary + 'E6'};
  color: ${({ theme }) => theme.colors.text.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme, $isScrolled }) => 
    $isScrolled ? `${theme.colors.border}40` : 'transparent'};
  transition: all 0.3s ease;
  box-shadow: ${({ $isScrolled, theme }) => 
    $isScrolled ? '0 1px 2px rgba(0, 0, 0, 0.03)' : 'none'};
  height: 72px;

  @media (max-width: 768px) {
    padding: 12px 20px;
    height: 64px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  text-decoration: none;
`;

const LogoIcon = styled(motion.img)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Title = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background.primary + 'F2'};
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const LinkWrapper = styled(motion.div)`
  position: relative;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 8px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
    transition: color 0.3s ease;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
  }
`;

const MenuLine = styled(motion.span)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 2px;
  transition: background-color 0.3s ease;
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(AnimatePresence)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const navVariants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: { 
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const menuButtonVariants = {
  closed: {
    rotate: 0
  },
  open: {
    rotate: 90
  }
};

const MainContentWrapper = styled.main`
  padding-top: 72px;

  @media (max-width: 768px) {
    padding-top: 64px;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderWrapper
        $isScrolled={isScrolled}
      >
        <Logo to="/">
          <LogoIcon src={logo} alt="Logo" />
          <Title>Thomas Avice</Title>
        </Logo>
        
        <DesktopNav>
          <LinkWrapper>
            <Link to="/">About</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/projects">Projects</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/contact">Contact</Link>
          </LinkWrapper>
        </DesktopNav>
        
        <MobileMenuButton
          onClick={toggleMenu}
          variants={menuButtonVariants}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MobileMenuButton>
        
        <MobileNav>
          {isMenuOpen && (
            <Nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
            >
              <LinkWrapper>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>About</Link>
              </LinkWrapper>
              <LinkWrapper>
                <Link to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              </LinkWrapper>
              <LinkWrapper>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </LinkWrapper>
            </Nav>
          )}
        </MobileNav>
      </HeaderWrapper>
      <MainContentWrapper />
    </>
  );
};

export default Header;
