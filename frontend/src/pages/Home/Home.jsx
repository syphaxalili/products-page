import { useState, useEffect } from "react";
import useProductsContext from "../../hooks/useProductsContext";
import "./home.css";
import Typography from "@mui/material/Typography";

// import components
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductForm from "../../components/ProductForm/ProductForm";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const [isShowForm, setIsShowForm] = useState(false);
  const [productInEdit, setProductInEdit] = useState(null);

  const openUpdateForm = (product) => {
    setProductInEdit(product);
    setIsShowForm(true);
  };

  const openCreateForm = () => {
    setProductInEdit(null);
    setIsShowForm((currentState) => !currentState);
  };

  const closeForm = () => {
    setProductInEdit(null);
    setIsShowForm(false);
  };

  // Make an API fetch to get products from database
  useEffect(() => {
    const fetchProducts = async (endpoint) => {
      const response = await fetch(endpoint);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts("http://localhost:4000/api/products");
  }, []);

  let productsElements = products.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
      openUpdateForm={openUpdateForm}
    />
  ));

  return (
    <>
      <div className="home__container">
        <div className="container">
          <Navbar openCreateForm={openCreateForm} />
          {products && products.length > 0 ? (
            <div className="products__container">{productsElements}</div>
          ) : (
            <div className="empty__container">
              <Typography color="textPrimary">
                The database is empty. Try to add new products now!
              </Typography>
            </div>
          )}
        </div>
        {isShowForm && (
          <ProductForm closeForm={closeForm} productInEdit={productInEdit} />
        )}
      </div>
    </>
  );
};

export default Home;
