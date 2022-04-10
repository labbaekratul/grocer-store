import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

function Products() {
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="row home__card__section__row">
      <div className="feature-products">
        <h3>Feature Products</h3>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          {products?.slice(0, 9).map((products) => (
            <div
              className="col-lg-4 col-md-6 col-12 product_card"
              key={products._id}
            >
              <Card className="p-3">
                <Link to={`/products/${products._id}`}>
                  <img
                    src={products.image}
                    alt={products.brand}
                    className="product__img"
                  />
                </Link>
                <Link to={`/products/${products._id}`} className="brandName">
                  {products.name}
                </Link>
                <div>
                  <b>
                    Store :{" "}
                    <span style={{ color: "red" }}>{products.store}</span>{" "}
                  </b>
                </div>
                <Rating
                  reviews={products.numReviews}
                  rating={products.rating}
                />
                <div className="price_and_brand">
                  <span className="price">${products.price}</span>
                  <Link to={`/products/${products._id}`}>
                    <span className="brand">{products.brand}</span>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
