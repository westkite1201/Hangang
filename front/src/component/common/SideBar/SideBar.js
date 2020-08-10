import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  function showSettings(event) {
    event.preventDefault();
  }
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu {...props}>
      <StyledLink id="home" className="menu-item" to="/">
        HANGANG
      </StyledLink>
      <br />

      <StyledLink id="home" className="menu-item" to="/Quotes">
        Quotes
      </StyledLink>

      <br />

      <StyledLink k id="contact" className="menu-item" to="/admin">
        admin
      </StyledLink>
      <br />

      <StyledLink id="about" className="menu-item" to="/about">
        About
      </StyledLink>

      <br />

      <StyledLink k id="contact" className="menu-item" to="/contact">
        Contact
      </StyledLink>

      <br />
    </Menu>
  );
};
export default SideBar;
