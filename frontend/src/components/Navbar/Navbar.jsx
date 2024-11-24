import React from "react";
import "./navbar.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const Navbar = ({ openCreateForm }) => {
  return (
    <nav className="nav__container container">
      <div className="content">
        <Typography variant="h5" component="h1" color="initial">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateForm}
        >
          New product
        </Button>
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
