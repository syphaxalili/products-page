import React from "react";
import "./navbar.css";

const Navbar = ({ openCreateForm }) => {
  return (
    <nav className="nav__container container">
      <div className="content">
        <h2>Products</h2>
        <button className="create_product" onClick={openCreateForm}>
          <i className="fa-solid fa-plus"></i>New product
        </button>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
