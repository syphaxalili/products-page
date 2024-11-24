import { useState, useEffect } from "react";
import "./productform.css";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Modal,
  InputAdornment,
  Alert,
} from "@mui/material";

const ProductForm = ({ closeForm, productInEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: true,
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Used to pre-fill the form when editing a product
  useEffect(() => {
    if (productInEdit) {
      setProduct(productInEdit);
    }
  }, [productInEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = productInEdit
      ? `http://localhost:4000/api/products/${productInEdit._id}`
      : "http://localhost:4000/api/products";

    const method = productInEdit ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      handleShowError();
    }
    if (response.ok) {
      clearForm();
      setError(null);
      setEmptyFields([]);
      closeForm();
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: "",
      available: true,
    });
  };

  const handleValueChange = (e) => {
    const field = e.target.name;
    const newValue =
      e.target.name === "available" ? e.target.checked : e.target.value;
    setProduct((oldProduct) => {
      return {
        ...oldProduct,
        [field]: newValue,
      };
    });
  };

  const handleShowError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="form__container">
        <form className="form__content" onSubmit={handleSubmit}>
          <div className="header">
            <Typography variant="h6">
              {productInEdit ? "Edit Product" : "Add a New Product"}
            </Typography>
            <IconButton aria-label="close" onClick={closeForm}>
              <CloseIcon />
            </IconButton>
          </div>

          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            id="name"
            name="name"
            value={product.name}
            onChange={handleValueChange}
            className={emptyFields.includes("name") ? "error" : ""}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Type"
            name="type"
            value={product.type}
            onChange={handleValueChange}
            className={emptyFields.includes("type") ? "error" : ""}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            inputProps={{
              min: 0,
              max: 10000000,
              step: 0.05,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
            onChange={handleValueChange}
            className={emptyFields.includes("price") ? "error" : ""}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Rating"
            helperText="The value should be between 0 - 10"
            name="rating"
            type="number"
            value={product.rating}
            inputProps={{
              min: 0,
              max: 10,
              step: 0.1,
            }}
            onChange={handleValueChange}
            className={emptyFields.includes("rating") ? "error" : ""}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Warranty"
            helperText="In 'Years'"
            name="warranty_years"
            type="number"
            value={product.warranty_years}
            inputProps={{
              min: 1,
              max: 20,
            }}
            onChange={handleValueChange}
            className={emptyFields.includes("warranty_years") ? "error" : ""}
            fullWidth
            margin="normal"
            required
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Available"
            name="available"
            onChange={handleValueChange}
            checked={product.available}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ margin: "10px 0" }}
          >
            <Typography variant="button">
              {productInEdit ? "Update Product" : "Add Product"}
            </Typography>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ProductForm;
