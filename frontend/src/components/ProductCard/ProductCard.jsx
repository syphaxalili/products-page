import useProductsContext from "../../hooks/useProductsContext";
import "./productcard.css";

const ProductCard = ({ product, openUpdateForm }) => {
  const { dispatch } = useProductsContext();

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
    <div className="card__container">
      <div className="header">
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
        <div className="icons">
          <div
            className="icon edit__icon"
            onClick={() => openUpdateForm(product)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </div>
          <div className="icon delete__icon" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
      <h4 className="product__name">{product.name}</h4>
      <div className="content">
        <hr />
        <div className="details">
          <div className="type">
            <p className="label">Type</p>
            <p className="value">{product.type}</p>
          </div>
          <div className="rating">
            <p className="label">Rating</p>
            <p className="value">{product.rating}</p>
          </div>
          <div className="warranty">
            <p className="label">Warranty</p>
            <p className="value">{product.warranty_years} year(s)</p>
          </div>
        </div>
        <hr />
        <div className="price">
          <p className="label">Price</p>
          <p className="value">€ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
