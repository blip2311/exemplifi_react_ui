import React from "react";
import './Sidebar.scss';
import logo from '../../logo-exemplifi.svg';
import { NavLink } from "react-router-dom";
import { FaThLarge, FaMinusSquare } from "react-icons/fa";
export const Sidebar = () => {
  const toggleSidebar = () => {
    const siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      siteNav.classList.toggle('open'); // Toggle the 'open' class
    }
  };
  return (
    <>
      <aside className="site-nav">
      <NavLink to="/" className="nav-brand">  <img src={logo} alt="logo" /> Task Manager</NavLink>
        <ul className="sidebar-nav">
          <li className="nav-link">
            <NavLink to="/" className="" onClick={toggleSidebar}><FaThLarge /> Overview</NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/" className="" onClick={toggleSidebar}><FaMinusSquare /> All Tasks</NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
