import { useDispatch } from "react-redux";
import "./productcard.css";

import {
  Typography,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductCard = ({ product, openUpdateForm }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/products/" + product._id,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_PRODUCT", payload: product });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }} className="card__container">
      <CardContent>
        <div className="card__header">
          <div
            className={
              product.available
                ? "availability available"
                : "availability not-available"
            }
          >
            <span className="circle"></span>
            <p>{product.available ? "Available" : "Out of stock"}</p>
          </div>
          <CardActions>
            <div className="icons">
              <IconButton
                aria-label="update product"
                onClick={() => openUpdateForm(product)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete product"
                onClick={handleDelete}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardActions>
        </div>

        <Typography variant="h5">{product.name}</Typography>

        <Divider sx={{ margin: "10px 0" }}></Divider>

        <div className="card__product-details">
          <div className="type">
            <Typography variant="overline" display="block">
              Type
            </Typography>
            <Typography>{product.type}</Typography>
          </div>
          <div className="rating">
            <Typography variant="overline" display="block">
              Rating
            </Typography>
            <Typography>{product.rating}</Typography>
          </div>
          <div className="warranty">
            <Typography variant="overline" display="block">
              Warranty
            </Typography>
            <Typography>{product.warranty_years} year(s)</Typography>
          </div>
        </div>

        <Divider sx={{ margin: "10px 0" }}></Divider>

        <div className="card__product-price">
          <Typography>Price</Typography>
          <Typography variant="h6">€ {product.price}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
