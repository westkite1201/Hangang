import React, { useState } from 'react';
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
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a>
      </main>
    </Menu>
  );
};
export default SideBar;
