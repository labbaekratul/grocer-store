import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Rating from "../components/Rating";

function CategoryScreen(props) {
  const [products, setProducts] = useState();
  const [cate, setCate] = useState([]);
  const [store, setStore] = useState([]);
  const [actClass, setActClass] = useState("");
  const { category } = props.match.params;

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/products?category=${category}`);
      setProducts(data);
    };
    getData();
  }, [category]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/products/categories`);
      setCate(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/products/store`);
      setStore(data);
    };
    getData();
  }, []);

  const activeHandler = async (id) => {
    const act = cate.find((x) => x === id);
    setActClass(act);
    const { data } = await axios.get(`/api/products?category=${id}`);
    setProducts(data);
  };

  const activeHandlerStore = async (id) => {
    const act = cate.find((x) => x === id);
    setActClass(act);
    const { data } = await axios.get(`/api/products?store=${id}`);
    setProducts(data);
  };

  return (
    <div className="product-list-page">
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-2">
            <div className="cate-bar">
              <div className="cate-class">
                <h4>Category</h4>
                <ul className="mb-3">
                  {cate ? (
                    cate.map((x, i) => (
                      <li
                        key={i}
                        onClick={() => activeHandler(x)}
                        className={actClass === x ? "active-class-cat" : ""}
                      >
                        {x}
                      </li>
                    ))
                  ) : (
                    <Loading />
                  )}
                </ul>
              </div>
              <div className="cate-class">
                <h4>Store</h4>
                <ul className="mb-3">
                  {store ? (
                    store.map((x, i) => (
                      <li
                        key={i}
                        onClick={() => activeHandlerStore(x)}
                        className={actClass === x ? "active-class-cat" : ""}
                      >
                        {x}
                      </li>
                    ))
                  ) : (
                    <Loading />
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8">
            {products ? (
              <div className="row">
                {products?.map((products) => (
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
                      <Link
                        to={`/products/${products._id}`}
                        className="brandName"
                      >
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
            ) : (
              <Loading />
            )}
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

export default CategoryScreen;
