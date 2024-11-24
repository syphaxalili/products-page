import { useState, useEffect } from "react";
import "./productform.css";
import useProductsContext from "../../hooks/useProductsContext";

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
  const { dispatch } = useProductsContext();

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
    }
    if (response.ok) {
      clearForm();
      setError(null);
      setEmptyFields([]);
      const actionType = productInEdit ? "UPDATE_PRODUCT" : "ADD_PRODUCT";
      dispatch({ type: actionType, payload: json });
      closeForm();
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      type: "",
      price: 0,
      rating: 0,
      warranty_years: 0,
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

  return (
    <div className="form__modal-container">
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="header">
          <h3 className="form__title">
            {productInEdit ? "Edit Product" : "Add a New Product"}
          </h3>
          <i className="fa-solid fa-xmark" onClick={closeForm}></i>
        </div>

        {error && <div className="error">{error}</div>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="The name of your product..."
          onChange={handleValueChange}
          value={product.name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label>Type</label>
        <input
          type="text"
          name="type"
          placeholder="Laptop / Phone / ...."
          onChange={handleValueChange}
          value={product.type}
          className={emptyFields.includes("type") ? "error" : ""}
        />

        <label>Price (€)</label>
        <input
          min={0}
          max={1000000}
          step={0.01}
          type="number"
          name="price"
          placeholder="0"
          onChange={handleValueChange}
          value={product.price}
          className={emptyFields.includes("price") ? "error" : ""}
        />

        <label>Rating (../10)</label>
        <input
          min={0}
          max={10}
          step={0.1}
          type="number"
          name="rating"
          placeholder="0"
          onChange={handleValueChange}
          value={product.rating}
          className={emptyFields.includes("rating") ? "error" : ""}
        />

        <label>Warranty (years)</label>
        <input
          min={0}
          type="number"
          placeholder="0"
          name="warranty_years"
          onChange={handleValueChange}
          value={product.warranty_years}
          className={emptyFields.includes("warranty_years") ? "error" : ""}
        />

        <div className="available">
          <label>Available</label>
          <input
            type="checkbox"
            name="available"
            className="available__checkbox"
            onChange={handleValueChange}
            checked={product.available}
          />
        </div>

        <button>{productInEdit ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
