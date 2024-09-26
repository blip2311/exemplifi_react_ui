import React, { useState } from "react";
import "./MobileHeader.scss";
import { NavLink } from "react-router-dom";
import logo from '../../logo-exemplifi.svg';

export const MobileHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      siteNav.classList.toggle('open'); // Toggle the 'open' class
    }
    setIsSidebarOpen(!isSidebarOpen); // Toggle state
  };

  return (
    <>
      <div className="bg-dark px-4 py-2 mobile-nav">
        <div className="row">
          <div className="col-8">
            <NavLink to="/" className="nav-brand">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <button
              className="navbar-toggler text-white"
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? "Close" : "Menu"} {/* Toggle text */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
