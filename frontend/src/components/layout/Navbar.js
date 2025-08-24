import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const NavContainer = styled.nav`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  h1 {
    margin: 0;
    font-size: 1.6rem;
    color: var(--primary-color);
    font-weight: 700;
  }
  
  span {
    color: var(--accent-color);
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    
    span {
      height: 3px;
      width: 100%;
      background-color: var(--primary-color);
      transition: all 0.3s ease;
      border-radius: 10px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    flex-direction: column;
    width: 100%;
    background-color: white;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: left 0.3s ease;
    z-index: 1;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 5px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
  
  &.active {
    color: var(--primary-color);
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }
`;

const ActionButton = styled(Link)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
  
  &:hover {
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.2);
  }
  
  @media (max-width: 768px) {
    margin: 15px auto 5px;
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 10;
  overflow: hidden;
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin-top: 10px;
  }
`;

const UserDropdownItem = styled(Link)`
  display: block;
  padding: 12px 15px;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
    color: var(--primary-color);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const closeUserDropdown = () => {
    setShowUserDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      closeUserDropdown();
      closeMenu();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return 'U';
    return currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          <h1>Brain<span>Detector</span></h1>
        </Logo>
        
        <MenuIcon onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MenuIcon>
        
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" className={isActive('/')} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/games" className={isActive('/games')} onClick={closeMenu}>
            Games
          </NavLink>
          <NavLink to="/quiz" className={isActive('/quiz')} onClick={closeMenu}>
            Quiz
          </NavLink>
          <NavLink to="/speech" className={isActive('/speech')} onClick={closeMenu}>
            Speech Analysis
          </NavLink>
          <NavLink to="/resources" className={isActive('/resources')} onClick={closeMenu}>
            Resources
          </NavLink>
          <NavLink to="/alzheimer-detector" className="nav-link bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-2xl" style={{ marginLeft: "8px" }} onClick={closeMenu}>
            Alzheimer Detector
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <ActionButton to="/results" onClick={closeMenu}>
                Your Results
              </ActionButton>
              <UserMenu>
                <UserAvatar onClick={toggleUserDropdown}>
                  {getUserInitials()}
                </UserAvatar>
                
                {showUserDropdown && (
                  <UserDropdown>
                    <UserDropdownItem to="/profile" onClick={() => {closeUserDropdown(); closeMenu();}}>
                      Profile
                    </UserDropdownItem>
                    <UserDropdownItem to="/settings" onClick={() => {closeUserDropdown(); closeMenu();}}>
                      Settings
                    </UserDropdownItem>
                    <UserDropdownItem as="div" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                      Log out
                    </UserDropdownItem>
                  </UserDropdown>
                )}
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login" className={isActive('/login')} onClick={closeMenu}>
                Log In
              </NavLink>
              <ActionButton to="/signup" onClick={closeMenu}>
                Sign Up
              </ActionButton>
            </>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
