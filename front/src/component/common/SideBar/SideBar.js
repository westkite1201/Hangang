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
        <br/>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <br/>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <br/>
        <a onClick={showSettings} className="menu-item--small" href="">
          Settings
        </a>
        <br/>
        <a className="menu-item--small" href="/admin">
          Admin
        </a>
        <br/>
        <a className="menu-item--small" href="/submit-qoutes">
          Submit
        </a>
      </main>
    </Menu>
  );
};
export default SideBar;
