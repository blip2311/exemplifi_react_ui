import React from "react";
import "./MobileHeader.scss";
import { NavLink } from "react-router-dom";
import logo from '../../logo-exemplifi.svg';
export const MobileHeader = () => {
    const toggleSidebar = () => {
        const siteNav = document.querySelector('.site-nav');
        if (siteNav) {
          siteNav.classList.toggle('open'); // Toggle the 'open' class
        }
      };
    
  return (
    <>
      <div className="container d-block d-md-none bg-dark px-3 py-2">
        <div className="row">
            <div className="col-8">
            <NavLink to="/" className="nav-brand">  <img src={logo} alt="logo" /></NavLink>
            </div>
            <div className="col-4 d-flex justify-content-end">
            <button
        className="navbar-toggler text-white"
        type="button"
        aria-label="Toggle navigation bg-grey"
        onClick={toggleSidebar} // Call toggleSidebar when clicked
      >
        Menu
      </button>
            </div>
        </div>
      </div>
    </>
  );
};
export default MobileHeader;
