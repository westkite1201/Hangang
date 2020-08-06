import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function showSettings(event) {
    event.preventDefault();
  }
  function handleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      isOpen={isOpen}
      pushRotate
    >
      <main id="page-wrap">
        <div>
          <NavLink id="home" className="menu-item" to="/Quotes">
            Quotes
          </NavLink>
        </div>
        <br />
        <div>
          <NavLink id="about" className="menu-item" to="/about">
            About
          </NavLink>
        </div>
        <br />
        <div>
          <NavLink k id="contact" className="menu-item" to="/contact">
            Contact
          </NavLink>
        </div>
        <br />
      </main>
    </Menu>
  );
};
export default SideBar;
