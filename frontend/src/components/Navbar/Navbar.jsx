import "./navbar.css";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
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
      <Divider sx={{ margin: "10px 0 0" }}></Divider>
    </nav>
  );
};

export default Navbar;
