import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import ListIcon from '../../Filter.png';
import { NavLink } from "react-router-dom";
import "./Header.scss";
import FilterForm from "../../Pages/Home/FilterForm";
export const  HeaderFilterForm= () => {
  return (
    <>
      <div className="row top-header">
        <div className="col-md-3">
          <button className="btn-list btn"><img src={ListIcon} alt="List Icon" /> List</button>
        </div>
        <div className="col-md-9">
          <div className="row ">
          <div className="col-12 col-md-9 order-2 order-md-1">
          <FilterForm />
          </div>
          <div className="col-12 col-md-3 d-flex justify-content-md-end order-1 order-md-2 my-4 my-md-0">
          <NavLink to="/create-task" className="btn-create-task d-inline-flex">Create Task <CiCirclePlus /></NavLink>
          </div>
          </div>          
        </div>      
      </div>
    </>
  );
};
export default HeaderFilterForm;
