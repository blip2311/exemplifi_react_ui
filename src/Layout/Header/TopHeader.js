import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import ListIcon from '../../Filter.png';
import { NavLink } from "react-router-dom";
import "./Header.scss";
export const TopHeader = () => {
  return (
    <>
      <div className="row top-header d-flex align-items-center">
        <div className="col-6">
          <button className="btn-list btn"><img src={ListIcon} alt="List Icon" /> List</button>
        </div>
        <div className="col-6 form-btn-wrap">
          <NavLink to="/create-task" className="btn-create-task">Create Task <CiCirclePlus /></NavLink>
        </div>      
      </div>
    </>
  );
};
export default TopHeader;
