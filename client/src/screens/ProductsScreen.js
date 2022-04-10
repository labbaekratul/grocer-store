import { Button, Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { detailsProduct } from "../redux/actions/productActions";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/Navbar";

function ProductsScreen(props) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addTocartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      <Navbar />
      <div className="back-to-home text-center">
        <Link to="/" className="bth_btn">
          <Button className="bth_btn1">Back to Shopping</Button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox />
      ) : (
        <div className="container-fluid">
          <div className="row productdetail_page_row">
            <div className="col-xl-4 col-12 col-md-6 mb-5 productdetail_img_col">
              <Card>
                <img
                  src={product.image}
                  alt={product.name}
                  className="productdetail_img"
                />
              </Card>
            </div>
            <div className="col-xl-4 col-12 col-md-6 my-5 product_details_deatilspage">
              <h4>{product.name}</h4>

              <Rating reviews={product.numReviews} rating={product.rating} />
              <p className="price1">Price: ${product.price}</p>
              <p className="comonclall">Description:</p>
              <p className="comonclall">{product.description}</p>
              <p className="comonclall">Images:</p>
              <Card className="mini-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mini-img"
                />
              </Card>
            </div>
            <div className="col-xl-4 col-12 col-md-6">
              <div className="add_to_cart_area_div">
                <Card className="p-3 add_to_cart_area">
                  <div className="add_to_cart_area_col mb-2">
                    <span className="add_to_cart_keyname">Category :</span>{" "}
                    <span>{product.category}</span>
                  </div>
                  <div className="add_to_cart_area_col mb-2">
                    <span className="add_to_cart_keyname">Store :</span>{" "}
                    <span className="brand">{product.store}</span>
                  </div>
                  <Rating
                    reviews={product.numReviews}
                    rating={product.rating}
                  />
                  <div className="add_to_cart_area_col mb-2 mt-2">
                    <span className="add_to_cart_keyname">Price :</span>{" "}
                    <span className="price">${product.price}</span>
                  </div>
                  <div className="add_to_cart_area_col mb-2">
                    <span className="add_to_cart_keyname">Status :</span>{" "}
                    {product.countInStock > 0 ? (
                      <span className="instock">In Stock</span>
                    ) : (
                      <span className="outofstock">Out of Stock</span>
                    )}
                  </div>
                  <div className="add_to_cart_area_col mb-3">
                    <span className="add_to_cart_keyname">Qty :</span>{" "}
                    <span>
                      <FormControl variant="outlined">
                        <Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((e) => (
                            <MenuItem key={e + 1} value={e + 1}>
                              {e + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </span>
                  </div>
                  <div className="addtocart_btnDiv">
                    {product.countInStock > 0 ? (
                      <button
                        className="addtocart_btn"
                        onClick={addTocartHandler}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;
